(function(){

    angular.module('protocoloApp',[])
    
    .controller('ViewController', function(){
        var self = this;
        self.viewFlags = {
            'activeSection': null,
            'activeSubsection': null,
            'creatingCovariable': false,
            'editingCovariable': false
        };
        
        self.editingCovariableIndex = '';
        
        self.visited = {
            'general': {
                'main': false,
                'titulo': false,
                'antecedentes': false,
                'objetivos': false
            },
            'poblacion': {
                'main': false,
                'periodo': false,
                'inclusion': false,
                'exclusion': false,
                'comentarios': false
            },
            'evento': {
                'main': false,
                'definicion': false,
                'avanzadas': false,
                'comentarios': false
            },
            'controles': {
                'main': false
            },
            'exposicion': {
                'main': false,
                'definicion': false,
                'avanzadas': false,
                'comentarios': false
            },
            'covariables': {
                'main': false
            },
            'analisis':  {
                'main': false
            },
            'limitaciones': {
                'main': false
            },
            'cronograma': {
                'main': false
            },
            'bibliografia': {
                'main': false
            },
            'resumen': {
                'main': false
            },
            'envio': {
                'success': true,
                'error': true
            }
        }
        
        self.protocolo = {
            'titulo': '',
            'hipotesis': '',
            'antecedentes': '',
            'objetivos': '',
            'poblacion': {
                'periodo': {
                    'inicio': 2005,
                    'fin': 2010
                },
                'edad': {
                    'minima': 0,
                    'maxima': 109
                },
                'sexo': 'ambos',
                'inclusion': '',
                'exclusion': '',
                'comentarios': ''
            },
            'caso': {
                'tipo': 'diagnostico',
                'definicion': '',
                'adicionales': {'requerido': false, 'detalles': ''},
                'dosis': {'requerido': false, 'detalles': '', 'tipo': 'ddd'},
                'duracion': {'requerido': false, 'tipo': 'continua','gap': 30},
                'comentarios': ''
            },
            'controles': {
                'numero': 1,
                'emparejamiento': {
                    'requerido': true,
                    'edad': true,
                    'sexo': true,
                    'periodo': false,
                    'detalles': ''
                }
                
            },
            'exposicion': {
                'tipo': 'diagnostico',
                'definicion': '',
                'adicionales': {'requerido': false, 'detalles': ''},
                'dosis': {'requerido': false, 'detalles': '', 'tipo': 'ddd'},
                'duracion': {'requerido': false, 'tipo': 'continua','gap': 30},
                'comentarios': ''
            },
            'covariables': [],
            'analisis': {
                'incidencia': {
                    'requerido': false,
                    'detalles': ''
                },
                'or': {
                    'requerido': false,
                    'detalles': ''
                },
                'subgrupos': {
                    'requerido': false,
                    'detalles': ''
                },
                'sensibilidad': {
                    'requerido': false,
                    'detalles': ''
                },
                'otros': ''
            },
            'limitaciones': '',
            'cronograma': '',
            'bibliografia': '',
            'resumen':  {
                'automatico': '',
                'manual': ''
            }
        
        };
        
        self.newCovariable = {
            'nombre': '',
            'tipo': '',
            'definicion': '',
            'comentarios': '',
            'temporalidad': {'tipo': 'ever', 'dias': '30'}
        }
        
        self.covariableToDelete = {};
        
        self.error_msg = [];
        
        self.setVariableToDelete = function (covariable) {
            self.covariableToDelete = covariable;
        }
        
        self.test = function() {
            console.log(self);
        }
        
        self.checkSubsection = function(section,subsection) {
            return (self.viewFlags.activeSection === section && self.viewFlags.activeSubsection === subsection)
        }
        
        self.setSubsection = function(section,subsection) {
            self.updateResumenAutomatico();
            self.viewFlags.activeSection = section;
            self.viewFlags.activeSubsection = subsection;
            self.visited[section][subsection] = true;
            
        }
        
        self.updateResumenAutomatico = function() {
            self.protocolo.resumen.automatico = "ANTECEDENTES: " + 
                self.protocolo.antecedentes.slice(0,150) + 
                "..." + 
                "OBJETIVO: Con el objetivo de confirmar si " + self.protocolo.hipotesis.toLowerCase() + " se propone la realización de un estudio de caso-control anidado utilizando como fuente de datos la base de datos BIFAP. " +
                "PACIENTES Y METODOS: La cohorte inicial estará compuesta por aquellos pacientes en seguimiento durante el periodo entre el 1 de enero de " + self.protocolo.poblacion.periodo.inicio + " y el 31 de diciembre de " + self.protocolo.poblacion.periodo.fin + ", de sexo " + self.protocolo.poblacion.sexo + " entre " + self.protocolo.poblacion.edad.minima + " y " + self.protocolo.poblacion.edad.minima + " años de edad, con criterio de inclusión " + self.protocolo.poblacion.inclusion.toLowerCase() + " y excluyendo " + self.protocolo.poblacion.exclusion.toLowerCase() + ". Se definirán como caso a aquellos pacientes con " + self.protocolo.caso.definicion.toLowerCase() + ". La exposición principal a analizar será " + self.protocolo.exposicion.definicion.toLowerCase() + ". Para cada caso se seleccionarán " + self.protocolo.controles.numero + " controles";
                if(self.protocolo.controles.emparejamiento.requerido) {
                    self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + " apareados por ";
                    if(self.protocolo.controles.emparejamiento.edad) {
                        self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + "edad ";
                    };
                    
                    if(self.protocolo.controles.emparejamiento.sexo) {
                        self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + "sexo ";
                    };
                    
                    if(self.protocolo.controles.emparejamiento.sexo) {
                        self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + "periodo de estudio ";
                    };
                    self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + self.protocolo.controles.emparejamiento.detalles.toLowerCase();

                }
                
                if(self.protocolo.covariables.length > 0) {
                    self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + ". De cada paciente se recogeran adicionalmente las siguientes covariables: ";
                    self.protocolo.covariables.forEach(function(covariable){
                        self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + covariable.nombre.toLowerCase() + " ";
                    });
                }
                self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + " LIMITACIONES: " + self.protocolo.limitaciones;
                
                self.protocolo.resumen.automatico.replace(/\n/g,"");
                
            
        }
        
        self.checkCompleteness = function(section,subsection) {
            var r = {
                'validation': false,
                'error_msg': []
            };
            switch (section) {
                case 'general':
                    switch(subsection) {
                        case 'main':
                            r.validation = (self.checkCompleteness('general','titulo').validation && 
                                           self.checkCompleteness('general','antecedentes').validation && 
                                           self.checkCompleteness('general','objetivos').validation);
                            break;
                        case 'titulo':
                            if(self.protocolo.titulo.length < 11) {
                                r.error_msg.push({'msg': "Debe incluir un título para el protocolo", 'section': section, 'subsection': subsection});
                            }
                            if(self.protocolo.hipotesis.length < 11) {
                                r.error_msg.push({'msg': "Debe incluir una hipótesis de estudio", 'section': section, 'subsection': subsection});
                            }
                            r.validation = (self.visited.general.titulo &&
                                    self.protocolo.titulo.length > 10 &&
                                    self.protocolo.hipotesis.length > 10
                                    );
                            break;
                        case 'antecedentes':
                            if (self.protocolo.antecedentes.length < 101 ) {
                                r.error_msg.push({'msg': "Debe incluir una sección de antecedentes.", 'section': section, 'subsection': subsection});
                            }
                            r.validation = (self.visited.general.antecedentes &&
                                            self.protocolo.antecedentes.length > 100 
                                            );
                            break;
                        case 'objetivos':
                            if(self.protocolo.objetivos.length < 51 ) {
                                r.error_msg.push({'msg': "Debe incluir los objetivos del estudio", 'section': section, 'subsection': subsection});
                            }
                            r.validation = (self.visited.general.objetivos &&
                                           self.protocolo.objetivos.length > 50 
                                           );
                            break;
                    }
                    break;
                case 'poblacion':
                    switch(subsection) {
                        case 'main':
                            r.validation = (self.checkCompleteness('poblacion','periodo').validation && 
                                    self.checkCompleteness('poblacion','inclusion').validation && 
                                    self.checkCompleteness('poblacion','exclusion').validation &&
                                    self.checkCompleteness('poblacion','comentarios').validation)
                            break;
                        case 'periodo':
                            if(self.protocolo.poblacion.periodo.inicio < 2001 || self.protocolo.poblacion.periodo.fin > 2015 ) {
                                r.error_msg.push({'msg': "Periodo de estudio debe estar comprendido entre 2001 y 2015", 'section': section, 'subsection': subsection});
                            }
                            if(self.protocolo.poblacion.edad.minima < 0 || self.protocolo.poblacion.edad.maxima > 109 ) {
                                r.error_msg.push({'msg': "Edad debe estar comprendida entre 0 y 109 años.", 'section': section, 'subsection': subsection})
                            }
                            r.validation = (self.visited.poblacion.periodo &&
                                    self.protocolo.poblacion.periodo.inicio > 2000 &&
                                    self.protocolo.poblacion.periodo.fin < 2016 &&
                                    self.protocolo.poblacion.edad.minima >= 0 &&
                                    self.protocolo.poblacion.edad.maxima < 110
                                    );
                            break;
                        case 'inclusion':
                            r.validation = self.visited.poblacion.inclusion;
                            break;
                        case 'exclusion':
                            r.validation = self.visited.poblacion.exclusion;
                            break;
                        case 'comentarios':
                            r.validation = self.visited.poblacion.comentarios;
                            break;
                    }
                    break;
                case 'evento':
                    switch(subsection) {
                        case 'main':
                            r.validation = (self.checkCompleteness('evento','definicion').validation &&
                                            self.checkCompleteness('evento','avanzadas').validation &&
                                            self.checkCompleteness('evento','comentarios').validation);
                            break;
                        case 'definicion':
                            if(!self.protocolo.caso.definicion.length > 0) {
                                r.error_msg.push({'msg': "Debe incluir la definición del evento a estudio (definición de caso)", 'section': section, 'subsection': subsection});
                            }
                            r.validation = (self.visited.evento.definicion &&
                                            self.protocolo.caso.definicion.length > 0);
                            break;
                        case 'avanzadas':
                            r.validation = self.visited.evento.avanzadas;
                            break;
                        case 'comentarios':
                            r.validation = self.visited.evento.comentarios;
                            break;
                    }

                    
                    break;
                case 'controles':
                    r.validation = self.visited.controles.main;
                    break;
                case 'exposicion':
                    switch(subsection) {
                        case 'main':
                            r.validation = (self.checkCompleteness('exposicion','definicion').validation &&
                                            self.checkCompleteness('exposicion','avanzadas').validation &&
                                            self.checkCompleteness('exposicion','comentarios').validation);
                            break;
                            
                        case 'definicion':
                            if(!self.protocolo.exposicion.definicion.length > 0) {
                                r.error_msg.push({'msg': "Debe incluir la definición de la exposición principal a estudio", 'section': section, 'subsection': subsection});
                            }
                            r.validation = (self.visited.exposicion.definicion &&
                                            self.protocolo.exposicion.definicion.length > 0);
                            break;
                        case 'avanzadas':
                            r.validation = self.visited.exposicion.avanzadas;
                            break;
                        case 'comentarios':
                            r.validation = self.visited.exposicion.comentarios;
                            break;
                    }
                    break;
                case 'covariables':
                    r.validation = self.visited.covariables.main;
                    break;
                case 'analisis':
                    r.validation = self.visited.analisis.main;
                    break;
                case 'limitaciones':
                    r.validation = self.visited.limitaciones.main;
                    break;
                case 'cronograma':
                    r.validation = self.visited.cronograma.main;
                    break;
                case 'bibliografia':
                    r.validation = self.visited.bibliografia.main;
                    break;
                case 'resumen':
                    r.validation = self.visited.resumen.main;
                    break;
                default:
                    r.validation = true;
                    break;
            
            }
            return r;

        }
        
        self.createCovariable = function () {
            self.newCovariable = {
            'nombre': '',
            'tipo': '',
            'definicion': '',
            'comentarios': '',
            'temporalidad': {'tipo': 'ever', 'dias': '30'}
            };
            self.viewFlags.creatingCovariable = true;
        }
        
        self.deleteCovariable = function() {
                self.editingCovariableIndex = '';
                self.viewFlags.editingCovariable = false;
                var newCovArray = [];
                self.protocolo.covariables.forEach(function(pcov){
                    if(pcov.nombre != self.covariableToDelete.nombre) {
                        newCovArray.push(pcov);
                    }
                });
                self.protocolo.covariables = newCovArray;
        }
        
        self.editCovariable = function(covariableIndex) {
            self.editingCovariableIndex = covariableIndex;
            self.viewFlags.editingCovariable = true;
        }
        
        self.syncNewCovariableName = function() {
            switch(self.newCovariable.tipo) {
                case 'tabaco':
                    self.newCovariable.nombre = "TABACO";
                    break;
                case 'alcohol':
                    self.newCovariable.nombre = "ALCOHOL";
                    break;
                case 'imc':
                    self.newCovariable.nombre = "IMC";
                    break;
                default:
                    if(['IMC','ALCOHOL','TABACO'].indexOf(self.newCovariable.nombre) > -1) {
                        self.newCovariable.nombre = "";    
                    }
                    
                    break;
            }

        }
        
        self.addCovariable = function() {
            console.log();
            if(['tabaco','alcohol','imc'].indexOf(self.newCovariable.tipo) > -1) {
                console.log("es predefinida");
                self.newCovariable.temporalidad = {'tipo': null, 'dias': ''}
            }
            self.protocolo.covariables.push(self.newCovariable);
            self.newCovariable = {
                                 'nombre': '',
                                 'tipo': '',
                                 'definicion': '',
                                 'comentarios': '',
                                 'temporalidad': {'tipo': 'ever', 'dias': '30'}
                                 };
            self.viewFlags.creatingCovariable = false;
        };
        
        self.sendButton = function() {
            if(self.finalCheck().validation) {
                self.setSubsection('envio','success');
            } else {
                self.setSubsection('envio','error');
            }
            
        }
        
        self.finalCheck = function() {
            var validation = true;
            var error_msg = [];
            Object.keys(self.visited).forEach(function(sectionName) {
                Object.keys(self.visited[sectionName]).forEach(function(subSectionName){
                    var c = self.checkCompleteness(sectionName,subSectionName);
                    error_msg = error_msg.concat(c.error_msg);
                    if (!c.validation) {
                        validation = false;
                    }
                    if(!self.visited[sectionName][subSectionName]) {
                        error_msg.push({'msg': "Todavía no ha visitado la sección " + sectionName + " - " + subSectionName, 'section': sectionName, 'subsection': subSectionName});
                    }
                    
                });
            });
            self.error_msg = error_msg;

            return {'validation': validation,
                    'error_msg': error_msg
                }
            
            
        }
        
        self.error_msg = self.finalCheck().error_msg;
        
    });
})();