(function(){
    console.log("carga");
    angular.module('protocoloApp',[])
    
    .controller('ViewController', function(){
        var self = this;
        self.viewFlags = {
            'activeSection': null,
            'activeSubsection': null,
            'creatingCovariable': false
        };
        
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
            'tipo': ''
        }
        
        self.test = function() {
            console.log(self);
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
                "PACIENTES Y METODOS: La cohorte inicial estará compuesta por aquellos pacientes en seguimiento durante el periodo entre el 1 de enero de " + self.protocolo.poblacion.periodo.inicio + " y el 31 de diciembre de " + self.protocolo.poblacion.periodo.fin + ", de sexo " + self.protocolo.poblacion.sexo + " entre " + self.protocolo.poblacion.edad.minima + " y " + self.protocolo.poblacion.edad.minima + " años de edad, que tuvieran " + self.protocolo.poblacion.inclusion.toLowerCase() + " excluyendo a aquellos pacientes que " + self.protocolo.poblacion.exclusion.toLowerCase() + ". Se definirán como caso a aquellos pacientes con " + self.protocolo.caso.definicion.toLowerCase() + ". La exposición principal a analizar será " + self.protocolo.exposicion.definicion.toLowerCase() + ". Para cada caso se seleccionarán " + self.protocolo.controles.numero;
                if(self.protocolo.controles.emparejamiento.requerido) {
                    self.protocolo.resumen.automatico = self.protocolo.resumen.automatico + " controles apareados por ";
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
                
            
        }
        
        self.checkCompleteness = function(section,subsection) {
            switch (section) {
                case 'general':
                    switch(subsection) {
                        case 'main':
                            return (self.checkCompleteness('general','titulo') && 
                                    self.checkCompleteness('general','antecedentes') && 
                                    self.checkCompleteness('general','objetivos'));
                            break;
                        case 'titulo':
                            return (self.visited.general.titulo &&
                                    self.protocolo.titulo.length > 10 &&
                                    self.protocolo.hipotesis.length > 10
                                    );
                            break;
                        case 'antecedentes':
                            return (self.visited.general.antecedentes &&
                                    self.protocolo.antecedentes.length > 100 
                                    );
                            break;
                        case 'objetivos':
                            return (self.visited.general.objetivos &&
                                    self.protocolo.objetivos.length > 50 
                                    );
                            break;
                    }
                    break;
                case 'poblacion':
                    break;
                case 'evento':
                    break;
                case 'controles':
                    break;
                case 'exposicion':
                    break;
                case 'covariables':
                    break;
                case 'analisis':
                    break;
                case 'limitaciones':
                    break;
                case 'cronograma':
                    break;
                case 'bibliografia':
                    break;
                default:
                    return false;
            }
            
        }
        
        self.createCovariable = function () {
            self.newCovariable = {
                'nombre': '',
                'tipo': ''
            }
            self.viewFlags.creatingCovariable = true;
        }
        
        self.addCovariable = function() {
            self.protocolo.covariables.push({
                'nombre': self.newCovariable.nombre,
                'tipo': self.newCovariable.tipo
            });
            delete self.newCovariable;
            self.viewFlags.creatingCovariable = false;
        };
        
    });
})();