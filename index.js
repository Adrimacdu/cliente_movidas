'use strict'

// CREACION DE FORMULARIO LOGIN

let login = document.createElement('div')

login.style.width = '400px'
login.style.height = '400px'
login.style.border = '1px solid black'
login.id = 'form_login'

let form = document.createElement('form')

let inputEmail = document.createElement('input')

inputEmail.id = 'email'
inputEmail.placeholder = 'Introducir email'
inputEmail.type = 'email'
inputEmail.style.width = '250px'
inputEmail.style.margin = '10px auto'
inputEmail.style.padding = '20px'

let labelEmail = document.createElement('label')

labelEmail.for = 'email'
labelEmail.textContent= 'Email'

let inputPassword = document.createElement('input')

inputPassword.id = 'password'
inputPassword.placeholder = 'Introduce contraseña'
inputPassword.type = 'password'
inputPassword.style.width = '250px'
inputPassword.style.margin = '10px auto'
inputPassword.style.padding = '20px'

let labelPassword = document.createElement('label')

labelPassword.for = 'password'
labelPassword.textContent = 'Password'

form.appendChild(labelEmail)
form.appendChild(inputEmail)
form.appendChild(document.createElement('br'))
form.appendChild(labelPassword)
form.appendChild(inputPassword)

form.style.display = 'flex'
form.style.flexDirection = 'column'
form.style.marginTop = '40px'

let button = document.createElement('button')
button.style.padding = '25px'
button.style.width = '180px'
button.style.margin = '20px auto'
button.textContent = 'Log In'



button.addEventListener('click',function(event){

    event.preventDefault()

    let opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        })
    }

    fetch('http://localhost:8888/api/auth/jwt/create/', opciones)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        })
        .then(data => {        
        localStorage.setItem('access_token', data['access']);
        localStorage.setItem('refresh_roken', data['refresh'])
        
        console.log('Inicio de sesión exitoso');
        borrar_login()
        })
        .catch(error => {
        console.error('Error:', error);
        });
        
    })


form.appendChild(button)


login.appendChild(form)

login.style.textAlign ='center'
login.style.margin = 'auto'

document.body.appendChild(login)

function borrar_login(){
    document.body.removeChild(document.getElementById('form_login'))
    botonera()
}

// CREACION DE LA BOTONERA PRINCIPAL (( MODULOS  -  RAs  -  CEs ))

function botonera(){

    let div_botonera = document.createElement('div')

    div_botonera.style.width = '100%'
    div_botonera.style.display = 'flex'
    div_botonera.style.flexDirection = 'row'
    div_botonera.id = 'botonera'

    let boton_modulos = document.createElement('button') 

    boton_modulos.style.margin = 'auto'
    boton_modulos.textContent = 'Modulos'
    boton_modulos.style.padding = '20px'
    boton_modulos.style.width = '30%'

    boton_modulos.addEventListener('click', function(){
        document.body.removeChild(document.getElementById('botonera'))

        let div_listado= document.createElement('div')

        div_listado.style.width = '100%'
        div_listado.style.display = 'flex'
        div_listado.style.flexDirection = 'column'
        div_listado.id = 'listado'

        let h1 = document.createElement('h1')

        document.body.appendChild(div_listado)

        h1.style.textAlign = 'center'
        h1.textContent = 'Modulos'

        let boton_crear_modulo = document.createElement('button')

        boton_crear_modulo.style.width = '10%' 
        boton_crear_modulo.style.margin = '20px auto'
        boton_crear_modulo.style.padding = '10px'
        boton_crear_modulo.textContent = 'Crear modulo'

        boton_crear_modulo.addEventListener('click', borrar_y_crear_modulo)



        let boton_volver = document.createElement('button')

       
        boton_volver.style.width = '10%' 
        boton_volver.style.margin = '20px auto'
        boton_volver.textContent = '<--'

        boton_volver.addEventListener('click', borrar_y_botonera)


        
        div_listado.appendChild(h1)
        div_listado.appendChild(boton_crear_modulo)
        div_listado.appendChild(boton_volver)

        const opciones = {
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }

        fetch('http://localhost:8888/api/modulo_list', opciones)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                })
            .then(data => {      
                
                for(let i = 0; i < data.length; i++){

                    let div_modulo = document.createElement('div')
                    
                    div_modulo.textContent = data[i]['__str__']
                    div_modulo.style.width = '90%'
                    div_modulo.style.margin = 'auto'
                    div_modulo.style.height = '20px'
                    div_modulo.style.padding = '20px'
                    if(i%2 == 0){
                        div_modulo.style.background = 'lightgrey'
                    }
                    div_modulo.style.border = '1px solid black'
                    div_modulo.style.textAlign = 'center'
                    div_modulo.id = (data[i]['id']) 

                    div_modulo.addEventListener('click', detalle_modulo)

                    div_listado.appendChild(div_modulo)
                }

                })
            .catch(error => {
                console.error('Error:', error);
                });
    })

    let boton_ra = document.createElement('button')

    boton_ra.style.margin = 'auto'
    boton_ra.textContent = 'Resultado Aprendizaje'
    boton_ra.style.padding = '20px'
    boton_ra.style.width = '30%'

    boton_ra.addEventListener('click', function(){
        document.body.removeChild(document.getElementById('botonera'))

        let div_listado= document.createElement('div')

        div_listado.style.width = '100%'
        div_listado.style.display = 'flex'
        div_listado.style.flexDirection = 'column'
        div_listado.id = 'listado'

        let h1 = document.createElement('h1')

        document.body.appendChild(div_listado)

        h1.style.textAlign = 'center'
        h1.textContent = 'Resultado aprendizaje'

        let boton_volver = document.createElement('button')

       
        boton_volver.style.width = '10%' 
        boton_volver.style.margin = '20px auto'
        boton_volver.textContent = '<--'

        boton_volver.addEventListener('click', borrar_y_botonera)

        
        div_listado.appendChild(h1)
        div_listado.appendChild(boton_volver)


        const opciones = {
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }

        fetch('http://localhost:8888/api/ra_list', opciones)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                })
            .then(data => {        
                console.log(data)
                for(let i = 0; i < data.length; i++){

                    let div_ra = document.createElement('div')

                    div_ra.textContent = data[i]['__str__']
                    div_ra.style.width = '90%'
                    div_ra.style.margin = 'auto'
                    div_ra.style.height = '20px'
                    div_ra.style.padding = '20px'
                    if(i%2 == 0){
                        div_ra.style.background = 'lightgrey'
                    }
                    div_ra.style.border = '1px solid black'
                    div_ra.style.textAlign = 'center'

                    div_listado.appendChild(div_ra)
                }

                })
            .catch(error => {
                console.error('Error:', error);
                });
    })

    let boton_ce = document.createElement('button')

    boton_ce.style.margin = 'auto'
    boton_ce.textContent = 'Criterio Evaluacion'
    boton_ce.style.padding = '20px'
    boton_ce.style.width = '30%'

    boton_ce.addEventListener('click', function(){
        document.body.removeChild(document.getElementById('botonera'))

        let div_listado= document.createElement('div')

        div_listado.style.width = '100%'
        div_listado.style.display = 'flex'
        div_listado.style.flexDirection = 'column'
        div_listado.id = 'listado'



        let h1 = document.createElement('h1')

        document.body.appendChild(div_listado)

        h1.style.textAlign = 'center'
        h1.textContent = 'Criterios de Evaluacion'

        let boton_volver = document.createElement('button')

       
        boton_volver.style.width = '10%' 
        boton_volver.style.margin = '20px auto'
        boton_volver.textContent = '<--'

        boton_volver.addEventListener('click', borrar_y_botonera)


        
        div_listado.appendChild(h1)
        div_listado.appendChild(boton_volver)

        const opciones = {
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }

        fetch('http://localhost:8888/api/ce_list', opciones)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                })
            .then(data => {        
                console.log(data)
                for(let i = 0; i < data.length; i++){

                    let div_ce = document.createElement('div')

                    div_ce.textContent = data[i]['__str__']
                    div_ce.style.width = '90%'
                    div_ce.style.margin = 'auto'
                    div_ce.style.height = '20px'
                    div_ce.style.padding = '20px'
                    if(i%2 == 0){
                        div_ce.style.background = 'lightgrey'
                    }
                    div_ce.style.border = '1px solid black'
                    div_ce.style.textAlign = 'center'

                    div_listado.appendChild(div_ce)
                }

                })
            .catch(error => {
                console.error('Error:', error);
                });
    })

    div_botonera.appendChild(boton_modulos)
    div_botonera.appendChild(boton_ra)
    div_botonera.appendChild(boton_ce)

    document.body.appendChild(div_botonera) 
}

// RESET DEL BODY

function borrar_y_botonera(){
    document.body.removeChild(document.getElementById('listado'))
    botonera()
}

// CREACION DE MODULOS

function borrar_y_crear_modulo(){
    document.body.removeChild(document.getElementById('listado'))

    let div_listado= document.createElement('div')

        div_listado.style.width = '100%'
        div_listado.style.display = 'flex'
        div_listado.style.flexDirection = 'column'
        div_listado.id = 'listado'

        let h1 = document.createElement('h1')

        document.body.appendChild(div_listado)

        h1.style.textAlign = 'center'
        h1.textContent = 'Crear un Modulo'

        let boton_volver = document.createElement('button')

       
        boton_volver.style.width = '10%' 
        boton_volver.style.margin = '20px auto'
        boton_volver.textContent = '<--'

        boton_volver.addEventListener('click', borrar_y_botonera)


        
        div_listado.appendChild(h1)
        div_listado.appendChild(boton_volver)

        let form_modulo = document.createElement('form')

        form_modulo.style.display = 'flex'
        form_modulo.style.flexDirection = 'column'

        div_listado.appendChild(form_modulo)

        let input_nombre = document.createElement('input')
        input_nombre.id = 'nombre'
        input_nombre.type = 'text'
        input_nombre.placeholder = 'Inserta nombre del modulo'
        input_nombre.style.width = '20%'
        input_nombre.style.padding = '20px'
        input_nombre.style.margin = '10px auto'

        let label_nombre = document.createElement('label')
        label_nombre.for = 'nombre'
        label_nombre.textContent = 'Nombre:'
        label_nombre.style.margin = 'auto'

        let input_codigo = document.createElement('input')
        input_codigo.id = 'codigo'
        input_codigo.type = 'text'
        input_codigo.placeholder = 'Codigo del modulo'
        input_codigo.style.width = '20%'
        input_codigo.style.padding = '20px'
        input_codigo.style.margin = '10px auto'

        let label_codigo = document.createElement('label')
        label_codigo.for = 'codigo'
        label_codigo.textContent = 'Código'
        label_codigo.style.margin = 'auto'

        form_modulo.appendChild(label_nombre)
        form_modulo.appendChild(input_nombre)
        form_modulo.appendChild(label_codigo)
        form_modulo.appendChild(input_codigo)

        let boton_crear = document.createElement('button')

        boton_crear.style.padding = '20px'
        boton_crear.style.width = '10%'
        boton_crear.textContent = 'Crear Modulo'
        boton_crear.style.margin = 'auto'


        boton_crear.addEventListener('click', function(e){

            e.preventDefault()

            const valores = {
                nombre: document.getElementById('nombre').value,
                codigo: document.getElementById('codigo').value
            }

            const opciones = {
                method:'POST',
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',                   
                },
                body: JSON.stringify(valores)
            }


            fetch('http://localhost:8888/api/modulo_detail/', opciones)
            .then(response => borrar_y_botonera())
            .catch(error=> console.log(error))
        })

        form_modulo.appendChild(boton_crear)
}

// MOSTRAR LISTADO DE MODULOS

function detalle_modulo(event){

    document.body.removeChild(document.getElementById('listado'))

    let div_listado= document.createElement('div')

        div_listado.style.width = '100%'
        div_listado.style.display = 'flex'
        div_listado.style.flexDirection = 'column'
        div_listado.id = 'listado'

        let h1 = document.createElement('h1')

        document.body.appendChild(div_listado)

        h1.style.textAlign = 'center'
        h1.textContent = 'Detalle del Modulo'

        let boton_volver = document.createElement('button')

       
        boton_volver.style.width = '10%' 
        boton_volver.style.margin = '20px auto'
        boton_volver.textContent = '<--'

        boton_volver.addEventListener('click', borrar_y_botonera)


        
        div_listado.appendChild(h1)
        div_listado.appendChild(boton_volver)

    const opciones = {
        method:'GET',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    }

    console.log(event.target.id)

    fetch('http://localhost:8888/api/modulo_detail/' + event.target.id, opciones)
    .then(response => {
        if (response.ok) {
        return response.json();
        }
    })
    .then(datos => {
        console.log(datos)

        let form_detalle = document.createElement('form')

        form_detalle.style.display = 'flex'
        form_detalle.style.flexDirection = 'column'

        div_listado.appendChild(form_detalle)

        let input_id = document.createElement('input')
        input_id.style.width = '50%'
        input_id.style.padding = '10px'
        input_id.style.margin = '10px auto'
        input_id.value = datos['id']
        input_id.id = 'id'

        let label_id = document.createElement('label')
        label_id.for = 'id'
        label_id.textContent = 'Id:'
        label_id.style.textAlign = 'center'

        let input_codigo = document.createElement('input')
        input_codigo.style.width = '50%'
        input_codigo.style.padding = '10px'
        input_codigo.style.margin = '10px auto'
        input_codigo.value = datos['codigo']
        input_codigo.id = 'codigo'

        let label_codigo = document.createElement('label')
        label_codigo.for = 'codigo'
        label_codigo.style.textAlign = 'center'
        label_codigo.textContent = 'Codigo:'

        let input_nombre = document.createElement('input')
        input_nombre.style.width = '50%'
        input_nombre.style.padding = '10px'
        input_nombre.style.margin = '10px auto'
        input_nombre.value = datos['nombre']
        input_nombre.id = 'nombre'

        let label_nombre = document.createElement('label')
        label_nombre.for = 'nombre'
        label_nombre.textContent = 'Nombre:'
        label_nombre.style.textAlign = 'center'

        let div_act_del = document.createElement('div')

        div_act_del.style.display = 'flex'
        div_act_del.style.flexDirection = 'row'

        let boton_actualizar = document.createElement('button')

        boton_actualizar.style.width = '10%' 
        boton_actualizar.style.margin = '20px auto'
        boton_actualizar.textContent = 'Actualizar'
        boton_actualizar.style.padding = '10px'

        let boton_borrar = document.createElement('button')

        boton_borrar.style.width = '10%' 
        boton_borrar.style.margin = '20px auto'
        boton_borrar.textContent = 'Borrar'
        boton_borrar.style.padding = '10px'

        form_detalle.appendChild(label_id)
        form_detalle.appendChild(input_id)
        form_detalle.appendChild(label_codigo)
        form_detalle.appendChild(input_codigo)
        form_detalle.appendChild(label_nombre)
        form_detalle.appendChild(input_nombre)
        div_act_del.appendChild(boton_actualizar)
        div_act_del.appendChild(boton_borrar)
        form_detalle.appendChild(div_act_del)

        // ACTUALIZAR MODULOS

        boton_actualizar.addEventListener('click', function(e){

            e.preventDefault()

            const valores =  {
                id:document.getElementById('id').value,
                nombre:document.getElementById('nombre').value,
                codigo:document.getElementById('codigo').value
            }

            const opciones = {
                method:'PUT',
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',                   
                },
                body: JSON.stringify(valores)
            }

            fetch('http://localhost:8888/api/modulo_detail/'+input_id.value+'/', opciones)
            .then(response => borrar_y_botonera())
            .catch(error=> console.log(error))

        })

        // BORRAR MODULOS

        boton_borrar.addEventListener('click', function(e){

            e.preventDefault()

            const valores =  {
                id:document.getElementById('id').value,
                nombre:document.getElementById('nombre').value,
                codigo:document.getElementById('codigo').value
            }

            const opciones = {
                method:'DELETE',
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',                   
                },
                body: JSON.stringify(valores)
            }

            fetch('http://localhost:8888/api/modulo_detail/'+input_id.value+'/', opciones)
            .then(response => borrar_y_botonera())
            .catch(error=> console.log(error))
        })
    })
    .catch(error => console.log(error))
}
