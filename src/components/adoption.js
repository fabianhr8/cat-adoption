import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

export default class Adoption extends Component {
    constructor(props) {
        super(props);

        // Enlazar lso metodos para que  'this' se refiera a la clase
        this.cambioEnNombre = this.cambioEnNombre.bind(this);
        this.cambioEnEdadDueno = this.cambioEnEdadDueno.bind(this);
        this.cambioEnEdadGato = this.cambioEnEdadGato.bind(this);
        this.cambioEnRaza = this.cambioEnRaza.bind(this);
        this.cambioEnEnfermedad = this.cambioEnEnfermedad.bind(this);
        this.cambioEnMascotasPrevias = this.cambioEnMascotasPrevias.bind(this);
        this.cambioEnRazaPreferida = this.cambioEnRazaPreferida.bind(this);
        this.cambioEnHora = this.cambioEnHora.bind(this);
        this.alEnviarAspirante = this.alEnviarAspirante.bind(this);
        this.alEnviarGato = this.alEnviarGato.bind(this);

        this.state = {
            formaId: '',
            formaNombre: '',
            preguntas: [],
            nombre: '',
            edadDueno: 0,
            edadGato: 0,
            raza: '',
            enfermedadGato: false,
            mascotasPrevias: false,
            razaPreferida: 'Siamés',
            hora: '10 am'

        }
    };

    ////////////////////////////// GET
    async componentDidMount() {

        try {
            const {REACT_APP_API_VALUE} = process.env;

            const config = {
                method: 'GET',
                url: 'https://1crd6sdyg2.execute-api.us-east-1.amazonaws.com/dev/form',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key' : REACT_APP_API_VALUE
                },
            };
        
            const res = await axios(config);
            this.setState({ 
                formaId: res.data.form_id,
                formaNombre: res.data.form_name,
                preguntas: res.data.questions 
            });

        } catch (err) {
            console.log('ERROR!!!!');
            console.log(err);
        }

    }

    ///////////////////////////// Cambios en formulario
    async cambioEnNombre(e) {
        await this.setState({
            nombre: e.target.value,
        });
    }

    async cambioEnEdadDueno(e) {
        await this.setState({
            edadDueno: e.target.value,
        });
    }

    async cambioEnRaza(e) {
        await this.setState({
            raza: e.target.value,
        });
    }

    async cambioEnEdadGato(e) {
        await this.setState({
            edadGato: e.target.value,
        });
    }

    async cambioEnEnfermedad(e) {
        // let enfermedad;
        // if (e.target.value === 'false') {
        //     enfermedad = false;
        // } if (e.target.value === 'true') {
        //     enfermedad = true;
        // }
        console.log(e.target)
        // await this.setState({
        //     enfermedadGato: enfermedad,
        // });
    }

    async cambioEnMascotasPrevias(e) {
        await this.setState({
            mascotasPrevias: e.target.value,
        });
    }

    async cambioEnRazaPreferida(e) {
        await this.setState({
            razaPreferida: e.target.value,
        });
    }

    async cambioEnHora(e) {
        await this.setState({
            hora: e.target.value,
        });
    }

    /////////////////////////////// POST
    async alEnviarAspirante(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const nombre = this.state.nombre;
        const edadDueno = this.state.edadDueno;
        const mascotasPrevias = this.state.mascotasPrevias;
        const razaPreferida = this.state.razaPreferida;
        const hora = this.state.hora;

        const response = {
            "form_id": 1,
            "responses": {
                "1": nombre,
                "2": edadDueno,
                "3": mascotasPrevias,
                "4": razaPreferida,
                "5": hora
            }
        }

       this.postForm(response);

    }

    async alEnviarGato(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const raza = this.state.raza;
        const edadGato = this.state.edadGato;
        const enfermedad = this.state.enfermedadGato;

        const response = {
            "form_id": 2,
            "responses": {
                "1": raza,
                "2": edadGato,
                "3": enfermedad,
            }
        }

        this.postForm(response);

    }

    //////////////////////////// Despues del POST
    async postForm(response) {

        function replacer(key, value) {
            // Filtering out properties
            if (value === 'true') {
                return true;
            } else if (value === 'false') {
                return false; 
            } else {
                return value;
            }
          }
    
        const data = JSON.stringify(response, replacer);
    
        const config = {
            method: 'post',
            url: 'https://1crd6sdyg2.execute-api.us-east-1.amazonaws.com/dev/form',
            headers: { 
              'x-api-key': 'QSss48gu1Q2XXUkLR4e8276MNqJR0hKr4D2mWuWK', 
              'Content-Type': 'application/json'
            },
            data : data
          };

        try {
            const apiResponse = await axios(config);
            alert(apiResponse.statusText);
        } catch (err) {
            console.log('ERROR!!!!');
            console.log(err);
        }
    }


    ////////////////////////////////////// Formularios
    forma1(preguntasFormaActual) {

        return(
            <form onSubmit={this.alEnviarAspirante}>

                {/* ¿Cuál es tu nombre? */}
                <div className='form-group'>
                    <label>{preguntasFormaActual[0].question} </label>
                    <input type='text' required className='form-control' value={this.state.nombre}
                    onChange={this.cambioEnNombre} />
                </div>

                {/* ¿Cuál es tu edad? */}
                <div className='form-group'>
                    <label>{preguntasFormaActual[1].question} </label>
                    <input type='number' required className='form-control' value={this.state.edadDueno}
                    onChange={this.cambioEnEdadDueno} />
                </div>

                {/* ¿Has tenido mascotas antes? */}
                <div className='form-group' onChange={this.cambioEnMascotasPrevias}>
                    <label for='mascotasPrevias'>¿{preguntasFormaActual[2].question} </label>
                    <div class="form-check" >
                        <input type='radio' class="form-check-input" id='true' name='mascotasPrevias' value='true' />
                        <label for='true'>Sí</label>
                    </div>
                    <div class="form-check" >
                        <input type='radio' class="form-check-input" id='false' name='mascotasPrevias' value='false' checked />
                        <label for='false'>No</label>
                    </div>

                </div>

                {/* ¿Cuál de estas razas prefieres? */}
                <div className='form-group' onChange={this.cambioEnRazaPreferida} >
                    <label for='razaPreferida'>{preguntasFormaActual[3].question} </label>
                    <select class="form-control" id='razaPreferida' name='razaPreferida'>
                        <option value="Siamés" checked>{preguntasFormaActual[3].options[0]}</option>
                        <option value="Mestizo">{preguntasFormaActual[3].options[1]}</option>
                        <option value="Bengala">{preguntasFormaActual[3].options[2]}</option>
                    </select>
                    
                </div>

                {/* Elige una hora para una cita */}
                <div className='form-group' onChange={this.cambioEnHora} >
                    <label for='hora'>{preguntasFormaActual[4].question} </label>
                    <select class="form-control" id='hora' name='hora'>
                        <option value="10 am" checked>{preguntasFormaActual[4].options[0]}</option>
                        <option value="11 am">{preguntasFormaActual[4].options[1]}</option>
                        <option value="12 pm">{preguntasFormaActual[4].options[2]}</option>
                        <option value="1 pm">{preguntasFormaActual[4].options[3]}</option>
                    </select>
                </div>

                <div className='form-group'>
                    <input id='button' type="submit" value="submit" className="btn btn-primary" />
                </div>

            </form>
        )
    }

    forma2(preguntasFormaActual) {
        return(

            <form onSubmit={this.alEnviarGato}>

                {/* ¿Cuál es la raza de su gato? */}
                <div className='form-group' onChange={this.cambioEnRaza}>
                    <label for='raza'>{preguntasFormaActual[0].question} </label> 
                    <br />
                    <select id='raza' name='raza' class="form-control">
                        <option value='Siamés'>{preguntasFormaActual[0].options[0]}</option>
                        <option value='Mestizo'>{preguntasFormaActual[0].options[1]}</option>
                        <option value='Bengala'>{preguntasFormaActual[0].options[2]}</option>
                    </select>
                </div>

                {/* ¿Cuántos años tiene su gato? */}
                <div className='form-group'>
                    <label>{preguntasFormaActual[1].question} </label>
                    <input type='number' required className='form-control' value={this.state.edadGato}
                    onChange={this.cambioEnEdadGato} />
                </div>

                {/* ¿Su gato tiene alguna enfermedad? */}
                <div className='form-group'>
                    <label for='enfermedad'>{preguntasFormaActual[2].question} </label>
                    <div class="form-check" >
                        <input type='radio' class="form-check-input" id='true' name='enfermedad' 
                        onChange={this.cambioEnEnfermedad} />
                        <label for='true' class="form-check-label">Sí</label>
                    </div>
                    <div class="form-check" >
                        <input type='radio' class="form-check-input" id='false' name='enfermedad' 
                         checked onChange={this.cambioEnEnfermedad} />
                        <label for='false' class="form-check-label">No</label>
                    </div>
                </div>

                <div className='form-group'>
                    <input type="submit" value="submit" className="btn btn-primary" />
                </div>

            </form>
        )
    }
    /////////////////////////////////////////////

    render () {

        let formulario;
        const preguntasFormaActual = this.state.preguntas;

        if (this.state.formaId === 1) {
            formulario = this.forma1(preguntasFormaActual);
        } else if (this.state.formaId === 2) {
            formulario = this.forma2(preguntasFormaActual);
        }

        return (
            <body>
                <nav class="navbar navbar-dark bg-dark">
                    <a class="navbar-brand">Adopción de gatos</a>
                </nav>

                <div class='container' >

                    <div class='row'>
                        <div id='formulario' class='col-md-6 offset-md-3 rounded-3'>
                            <h4 class='display-6'>{this.state.formaNombre}</h4>
                            <section>{formulario}</section>
                        </div>
                    </div>


                </div>
            </body>

        )
    }
} 


