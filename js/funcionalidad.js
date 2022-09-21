

//const url= "https://g0fc1b3eeb2deea-reto2.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client"
//const url= "https://gedc07c6509dfcc-db.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client"

var formulario = document.getElementById("form");

form.addEventListener("submit", function(e){
	e.preventDefault();	

    var datos = new FormData(form)
    let ruta=datos.get('ruta')
    let accion=datos.get('accion')
    let id=datos.get('id')
    let name=datos.get('name')
    let email=datos.get('email')
    let age=datos.get('age')

    if(accion == "get"){
        get(ruta)
    }
    if(accion == "post"){
        post(ruta,id,name,email,age)
    }
    if(accion == "put"){
        actualiza_datos(ruta,id,name,email,age)
    }
    if(accion == "delete"){
        borrar_datos(ruta,id)
    }
    else{

    }
    
})


function get(pt_1) {
    const url= pt_1
    const api= new XMLHttpRequest();

    api.open("GET",url);
    api.send();
    api.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            let datos_api = JSON.parse(this.responseText);
            //console.log(datos_api.items)
            for(let item of datos_api.items){
                console.log(item)
            }
        }

    }
}

function post(ruta,pt_1,pt_2,pt_3,pt_4) {
    
    const url_get= ruta
    loadDoc(url_get, myFunction1)
    function loadDoc(url, cFunction) {
    const api= new XMLHttpRequest();

    api.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
           let datos_api = JSON.parse(this.responseText);

        //    let dato_get
            for (let index = 0; index < 1; index++) {
               let element = datos_api.items[index];
               cFunction(element);
            }
        //    work_date= dato_get
        }
        //ss=work_date
        //console.log(work_date)
        //console.log(this.responseText)
    }
    api.open("GET",url_get);
    api.send();
}
function myFunction1(xhttp) {
console.log(xhttp)
  }
    
//console.log(ss)
    //var contact = new Object();
    //contact.id = pt_1;
    //contact.name = pt_2;
    //contact.email = pt_3;
    //contact.age = pt_4;

    //var contact = {
    //    make: 'Ford',
    //    model: 'Mustang',
    //    year: 1969
    //};
        
    //var data = JSON.stringify(contact);


    const url=ruta
    var xhr= new XMLHttpRequest();
    xhr.open('POST', url,true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

    // PARA AUTORIZAR CON USUARIO Y CONTRASEÑA
    //var autorizacion = btoa("ADMIN:Estoesreto02");
    //xhr.setRequestHeader("Authorization","Basic "+ autorizacion);

    //xhr.send(data);
    //
    //xhr.onload = function () {
    //    if(xhr.status === 201) {
    //        traer_info(ruta)
    //    }
    //}
}

function traer_info(pt_1){

    const url= pt_1
    const api= new XMLHttpRequest();	
    
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let datos_api = JSON.parse(this.responseText);
                //console.log(datos_api.items)
                let res = document.getElementById("resultado")
                res.innerHTML = "";
                

                for(let item of datos_api.items){
  
                    var fila= Object.entries(item).map(function(casilla) {
                        //console.log(casilla); 
                        return casilla+"-->"
                    })
                    var nom= Object.keys(item).map(function(key) {
                        //console.log(key); 
                        return key
                    })
                    var val= Object.values(item).map(function(value) {
                        //console.log(values); 
                        return value
                    })
                    res.innerHTML +=`<li>${fila} </li>`

                }

            }
        }
        
    api.open("GET",url);
    api.send();
    
}

function guardar_datos(ruta,pt_1,pt_2,pt_3,pt_4){

    var contact = new Object();
    contact.id = pt_1;
    contact.name = pt_2;
    contact.email = pt_3;
    contact.age = pt_4;
        
    var data = JSON.stringify(contact);


    const url=ruta
    var xhr= new XMLHttpRequest();
    xhr.open('POST', url,true)
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')

    // PARA AUTORIZAR CON USUARIO Y CONTRASEÑA
    //var autorizacion = btoa("ADMIN:Estoesreto02");
    //xhr.setRequestHeader("Authorization","Basic "+ autorizacion);

    xhr.send(data);
    
    xhr.onload = function () {
        if(xhr.status === 201) {
            traer_info(ruta)
        }
    }

}

function actualiza_datos(ruta,pt_1,pt_2,pt_3,pt_4){
    
    var contact = new Object();
    contact.id = parseInt(pt_1);
    contact.name = pt_2;
    contact.email = pt_3;
    contact.age = parseInt(pt_4);
    var data = JSON.stringify(contact);

    var url = ruta
    var req= new XMLHttpRequest();
    req.open("PUT",url);

    req.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    
    // PARA AUTORIZAR CON USUARIO Y CONTRASEÑA
    //var auth = btoa("ADMIN:Estoesreto02");
    //req.setRequestHeader("Authorization","Basic "+auth);

    try{
        req.send(data);
        req.onload = function () {
            if(req.status === 201) {
                traer_info(ruta)
            }
        }
    }
    catch(err){
        alert(err.message);
    }

}

function borrar_datos(ruta,pt_1){
        
    var contact = new Object();
    contact.id = parseInt(pt_1);
    var data = JSON.stringify(contact);

    var url = ruta
    var req= new XMLHttpRequest();
    req.open("DELETE",url);

    req.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    
    // PARA AUTORIZAR CON USUARIO Y CONTRASEÑA
    //var auth = btoa("ADMIN:Estoesreto02");
    //req.setRequestHeader("Authorization","Basic "+auth);

    try{
        req.send(data);
        req.onload = function () {
            if(req.status === 204) {
                traer_info(ruta)
            }
        }
    }
    catch(err){
        alert(err.message);
    }

}

//alert("MIRAR QUE FUNCINALIDADES TIENE POSTMAN")

