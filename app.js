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
            'exposicion': {},
            'covariables': []
        
        };
        
        self.newCovariable = {
            'nombre': '',
            'tipo': ''
        }
        
        self.test = function() {
            console.log(self);
        }
        
        self.setSubsection = function(section,subsection) {
            self.viewFlags.activeSection = section;
            self.viewFlags.activeSubsection = subsection;
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