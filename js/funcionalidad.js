

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
        put(ruta,id,name,email,age)
    }
    if(accion == "delete"){
        dell(ruta,id)
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

function post(ruta,pt_1,pt_2,pt_3,pt_4){   
    const url_get= ruta
    peticion_get(url_get, retorno_http)
    function peticion_get(url, cFunction){
        const api= new XMLHttpRequest();
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
               let datos_api = JSON.parse(this.responseText);
                for(let index = 0; index < 1; index++){
                   let element = datos_api.items[index];
                   cFunction(element);
                }
            }
        }
        api.open("GET",url_get);
        api.send();
    }
    function retorno_http(xhttp){
        let at= xhttp
        let casillas_post=[]
        Object.entries(at).map(function(casilla){
            //console.log(casilla[0]); 
            casillas_post.push(casilla[0])
        })
        let postear = new Object()
        let datos_post=[pt_1,pt_2,pt_3,pt_4]
        for(let i = 0; i < casillas_post.length; i++){
            const element = casillas_post[i];
            text="postear."+element+"='"+ datos_post[i]+"'";
            eval(text)
        }
        //console.log(casillas_post.length,casillas_post); 
        let data = JSON.stringify(postear)
        const url=ruta
        var xhr= new XMLHttpRequest();
        xhr.open('POST', url,true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        xhr.send(data);
        xhr.onload = function (){
            if(xhr.status === 201){
                get(ruta)        
            }
        }
    }
}

function put(ruta,pt_1,pt_2,pt_3,pt_4){
    const url_get= ruta
    peticion_get(url_get, retorno_http)
    function peticion_get(url, cFunction){
        const api= new XMLHttpRequest();
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
               let datos_api = JSON.parse(this.responseText);
                for(let index = 0; index < 1; index++){
                   let element = datos_api.items[index];
                   cFunction(element);
                }
            }
        }
        api.open("GET",url_get);
        api.send();
    }
    function retorno_http(xhttp){
        let at= xhttp
        let casillas_post=[]
        Object.entries(at).map(function(casilla){
            //console.log(casilla[0]); 
            casillas_post.push(casilla[0])
        })
        let actulizar = new Object()
        let datos_put=[pt_1,pt_2,pt_3,pt_4]
        for(let i = 0; i < casillas_post.length; i++){
            const element = casillas_post[i];
            text="actulizar."+element+"='"+ datos_put[i]+"'";
            eval(text)
        }
        //console.log(casillas_post.length,casillas_post); 
        let data = JSON.stringify(actulizar)
        const url=ruta
        var xhr= new XMLHttpRequest();
        xhr.open("PUT",url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        try{
            xhr.send(data);
            xhr.onload = function (){
                if(xhr.status === 201){
                    get(ruta)
                }
            }
        }
        catch(err){
            alert(err.message);
        }
    }
}

function dell(ruta,pt_1){
    const url_get= ruta
    peticion_get(url_get, retorno_http)
    function peticion_get(url, cFunction){
        const api= new XMLHttpRequest();
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
               let datos_api = JSON.parse(this.responseText);
                for(let index = 0; index < 1; index++){
                   let element = datos_api.items[index];
                   cFunction(element);
                }
            }
        }
        api.open("GET",url_get);
        api.send();
    }
    function retorno_http(xhttp){
        let at= xhttp
        let casillas_post=[]
        Object.entries(at).map(function(casilla){
            //console.log(casilla[0]); 
            casillas_post.push(casilla[0])
        })
        let dell = new Object()
        let datos_dell=[pt_1]
        let ciclo= 0;
        for(let i = 0; i < casillas_post.length; i++){
            const element = casillas_post[i];
            text="dell."+element+"='"+ datos_dell[i]+"'";
            eval(text)
            ciclo += 1;
            if(ciclo == 1){
                break
            }
        }
        var data = JSON.stringify(dell);
        var url = ruta
        var req= new XMLHttpRequest();
        req.open("DELETE",url);
        req.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        try{
            req.send(data);
            req.onload = function (){
                if(req.status === 204){
                    get(ruta)
                }
            }
        }
        catch(err){
            alert(err.message);
        }
    }
}
