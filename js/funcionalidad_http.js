

var formulario = document.getElementById("form");

form.addEventListener("submit", function(e){
	e.preventDefault();	

    var datos = new FormData(form)
    let ruta=datos.get('ruta')
    let accion=datos.get('accion')
    let datos_in=datos.get('datos')


    if(accion == "get"){
        get(ruta)
    }
    if(accion == "post"){
        post(ruta,datos_in)
    }
    if(accion == "put"){
        put(ruta,datos_in)
    }
    if(accion == "delete"){
        dell(ruta)
    }
    else{

    }
    
})


function get(ruta) {
    const url= ruta
    const api= new XMLHttpRequest();
    api.open("GET",url);
    api.send();
    api.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let datos_api = JSON.parse(this.responseText);
            //console.log(datos_api.items)
            let res = document.getElementById("resultado")
            res.innerHTML = "";
            if (datos_api.items) {
                if (datos_api.items.length == 0) {
                    alert("NO HAY DATOS")
                }
                else{
                    let i=0
                    let tamaño= datos_api.items.length
                    for(let item of datos_api.items){
                        i++;
                        res.innerHTML +=`<li>IDGAMA: ${item.idGama}  | NAME: ${item.name}
                          | DESCRIPTION: ${item.description} </li> 
                          <button onclick="dell_gama('${item.idGama}')" > dell gama</button>`
                        if(i>tamaño){break;}
                    }
                    console.log(this.status)
                }
            }
            else{
                let datos_get = new Array();
                datos_get["items"] = datos_api;
                if (datos_get.items.length == 0) {
                    alert("NO HAY DATOS")
                }
                else{
                    let i=0
                    let tamaño= datos_get.items.length
                    for(let item of datos_get.items){
                        i++;
                        res.innerHTML +=`<li>IDGAMA: ${item.idGama}  | NAME: ${item.name}
                          | DESCRIPTION: ${item.description} </li> 
                          <button onclick="dell_gama('${item.idGama}')" > dell gama</button>`
                        if(i>tamaño){break;}
                    }
                    console.log(this.status)
                }
            }

        }
    }
}

function post(ruta,pt_1){   
    const url= ruta

    let someText = pt_1
    someText = someText.replace(/[^a-zA-Z1-9,:]/g, "");
    someText = someText.split(",")
    let postear_1= someText

    let datos_separados = new Array();
    for (let i = 0; i < postear_1.length; i++) {
        const element = postear_1[i];
        let key_value=element.split(":");
        datos_separados.push(key_value)
    }
    ciclo= 0
    let datos_in = {};
    for (let i = 0; i < datos_separados.length; i++) {
        ciclo += 1
        for (let j = 0; j < datos_separados[i].length; j++) {
            ciclo += 1

            let key = datos_separados[i][0];
            let value = datos_separados[i][1];
            datos_in[key] = value;
            if(ciclo>1){break;}        
        }
    }

    let data = JSON.stringify(datos_in)
    var xhr= new XMLHttpRequest();
    xhr.open('POST', url,true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(data);
    xhr.onload = function (){
        if(xhr.status === 201){
            console.log(xhr.status)       
        }
    }
    
}

function put(ruta,pt_1){
    const url= ruta

    let someText = pt_1
    someText = someText.replace(/[^a-zA-Z1-9,:]/g, "");
    someText = someText.split(",")
    let postear_1= someText

    let datos_separados = new Array();
    for (let i = 0; i < postear_1.length; i++) {
        const element = postear_1[i];
        let key_value=element.split(":");
        datos_separados.push(key_value)
    }
    ciclo= 0
    let actulizar = {};
    for (let i = 0; i < datos_separados.length; i++) {
        ciclo += 1
        for (let j = 0; j < datos_separados[i].length; j++) {
            ciclo += 1

            let key = datos_separados[i][0];
            let value = datos_separados[i][1];
            actulizar[key] = value;
            if(ciclo>1){break;}        
        }
    }
    console.log(actulizar); 
    let data = JSON.stringify(actulizar)
    console.log(data); 

    var xhr= new XMLHttpRequest();
    xhr.open("PUT",url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    try{
        xhr.send(data);
        xhr.onload = function (){
            if(xhr.status === 201){
                console.log(xhr.status)
            }
        }
    }
    catch(err){
        alert(err.message);
    }
    
}

function dell(ruta){
    const url= ruta
 
    const api= new XMLHttpRequest();	
    api.open("DELETE",url);

    api.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 204){
            console.log(this.status)
        }
    }
        
    api.send();

}
