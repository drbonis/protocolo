function showSection(section_id,level){
    $("."+level).addClass("section-hidden");
    $("#"+section_id).toggleClass("section-hidden");
    if(level=="section") {
        //shows first subsection of the section
        var firstSubsectionId = $("#"+section_id).children().eq(1).attr("id")
        $(".subsection").addClass("section-hidden");
        $("#"+firstSubsectionId).toggleClass("section-hidden");
        //update the active status of subsections
        $(".subsect_select").removeClass("active");
        $("#"+firstSubsectionId+"_select").parent().addClass("active");
    }
}

$('.sect_select').click(function(e){
    e.preventDefault();
    $(".sect_select").removeClass("active");
    $(this).addClass("active");
    var sectionToShow = $(this).children().first().attr("id").replace("_select",""); 
    showSection(sectionToShow,"section");
});


$('.subsect_select').click(function(e){
    e.preventDefault();
    $(".subsect_select").removeClass("active");
    $(this).addClass("active");
    $(this).parent().addClass("active");
    var subSectionToShow = $(this).children().first().attr("id").replace("_select",""); 
    showSection(subSectionToShow,"subsection");
});

addDiagnosis = function(diagnostico, target) {
    $("#"+target).append("<div class=\"diagnostico\"><button class=\" btn btn-danger-outline btn-sm borrar-elemento\"><span class=\"glyphicon glyphicon-trash \" aria-hidden=\"true\"></span></button><span> </span>"+diagnostico+"</div>");
};

addDrug = function(farmaco, target) {
    $("#"+target).append("<div class=\"farmaco\"><button class=\" btn btn-danger-outline btn-sm borrar-elemento\"><span class=\"glyphicon glyphicon-trash \" aria-hidden=\"true\"></span></button><span> </span>"+farmaco+"</div>");
};


hideAllCovariables = function () {
    //oculto todas las covariables previas
    $(".covariable-subsection").each(function(){
        if($(this).hasClass("hidden")==false) {
        $(this).toggleClass("hidden")
        };
    });
}

showCovariable = function(targetRoot, numCov) {
    hideAllCovariables();
    $("#"+targetRoot+"_1_"+numCov.toString()).toggleClass("hidden");
    $("#"+targetRoot+"_2_"+numCov.toString()).toggleClass("hidden");
    $("#"+targetRoot+"_3_"+numCov.toString()).toggleClass("hidden");
    $("#"+targetRoot+"_4_"+numCov.toString()).toggleClass("hidden");
    
    countCov = ($("#"+targetRoot+"_1").children().length);
    if(numCov == countCov && numCov > 0) {
        // si estamos mostrando la ultima covariable mostramos el botón de borrado
        // y sino lo ocultamos
        if($("#delCovariable").hasClass("hidden")) {
            $("#delCovariable").toggleClass("hidden")
        };
    } else {
        if($("#delCovariable").hasClass("hidden")==false) {
            $("#delCovariable").toggleClass("hidden")
        };
    }
    
}

addCovariable = function(targetRoot) {
    

    
    
    numCov = ($("#"+targetRoot+"_1").children().length);
    
    // actualizo contadores de navegador de covariables
    $("#countCovariable").html((numCov+1).toString());
    $("#punteroCovariable").html((numCov+1).toString());

    // añado subsecciones de la nueva covariable
    $("#"+targetRoot+"_1").append("<div id='"+targetRoot+"_1_"+(numCov+1).toString()+"' class='row padded covariable-subsection'>Seccion para covariable "+(numCov+1).toString()+"</div>");
    $("#"+targetRoot+"_2").append("<div id='"+targetRoot+"_2_"+(numCov+1).toString()+"' class='row padded covariable-subsection'>Seccion para covariable "+(numCov+1).toString()+"</div>");
    $("#"+targetRoot+"_3").append("<div id='"+targetRoot+"_3_"+(numCov+1).toString()+"' class='row padded covariable-subsection'>Seccion para covariable "+(numCov+1).toString()+"</div>");
    $("#"+targetRoot+"_4").append("<div id='"+targetRoot+"_4_"+(numCov+1).toString()+"' class='row padded covariable-subsection'>Seccion para covariable "+(numCov+1).toString()+"</div>");
    // muestro la nueva covariable
    showCovariable(targetRoot,numCov+1);
}

delCovariable = function(targetRoot, numCovToDel) {
    numCov = ($("#"+targetRoot+"_1").children().length);
    if(numCovToDel > 0 && numCovToDel == numCov) {
        hideAllCovariables();
        
        
        // actualizo contadores de navegador de covariables
        $("#countCovariable").html((numCov-1).toString());
        $("#punteroCovariable").html((numCovToDel-1).toString());
        
        // elimino subsecciones de la covariable
        $("#"+targetRoot+"_1_"+(numCovToDel).toString()).remove();
        $("#"+targetRoot+"_2_"+(numCovToDel).toString()).remove();
        $("#"+targetRoot+"_3_"+(numCovToDel).toString()).remove();
        $("#"+targetRoot+"_4_"+(numCovToDel).toString()).remove();

        showCovariable(targetRoot, numCovToDel - 1);
    }
};

$('#add_diagnosis').click(function(e){
    e.preventDefault();
    addDiagnosis(anadirDiagnosticoInput.value,$(document.body).data("botonesListaTarget"));
    anadirDiagnosticoInput.value = "";
    $("#addDiagnosisModal").modal('toggle');
});


$('#add_drug').click(function(e){
    e.preventDefault();
    addDrug(anadirFarmacoInput.value,$(document.body).data("botonesListaTarget"));
    anadirFarmacoInput.value = "";
    $("#addDrugModal").modal('toggle');
});


$("#miFormulario").on("click","button.borrar-elemento",function(e){
    e.preventDefault();
    $(this).parent().remove();
});

$(".botones-listas").on("click",function(e){

    switch ($(this).attr("id")) {
        case "addInclusionDiagnosisButton":
            $(document.body).data("botonesListaTarget", "formInclusionDiagnosticosList" );
            break;
        case "addInclusionDrugButton":
            $(document.body).data("botonesListaTarget", "formInclusionFarmacosList" );
            break;    
        case "addExclusionDiagnosisButton":
            $(document.body).data("botonesListaTarget", "formExclusionDiagnosticosList" );
            break;
        case "addExclusionDrugButton":
            $(document.body).data("botonesListaTarget", "formExclusionFarmacosList" );
            break;
        case "addEventoDiagnosisButton":
            $(document.body).data("botonesListaTarget", "formEventoDiagnosticosList" );
            break;
        case "addEventoDrugButton":
            $(document.body).data("botonesListaTarget", "formEventoDrugsList" );
            break;
        case "addEventoDiagnosisByDrugButton":
            $(document.body).data("botonesListaTarget", "formEventoDiagnosisByDrugsList" );
            break;
        case "addExposicionDiagnosisButton":
            $(document.body).data("botonesListaTarget", "formExposicionDiagnosticosList" );
            break;
        case "addExposicionDrugButton":
            $(document.body).data("botonesListaTarget", "formExposicionDrugsList" );
            break;
        case "addExposicionDiagnosisByDrugButton":
            $(document.body).data("botonesListaTarget", "formExposicionDiagnosisByDrugsList" );
            break;
        default:
            $(document.body).data("botonesListaTarget", "no_target" );
            break;
    }
});



radioSwitcher = function (radioRoot, optionContainerId){
    
    console.log($("."+radioRoot+".default").prop("checked", true));
    console.log("."+radioRoot+".default");
    $("."+radioRoot).on("change", function(e){
        if($(this).is(':checked')) {
            $("#"+optionContainerId).toggleClass('hidden');
        }
    });
    console.log("radioSwitcher: radioRoot: "+radioRoot+", optionContainerId: "+optionContainerId);
}

// initialize select and radio buttons
$(document).ready(function() {
    console.log("Document ready");
    if ($(".evento-diagnostico").hasClass("hidden")==true) {
        $(".evento-diagnostico").toggleClass("hidden")
    }
    if ($(".evento-farmaco").hasClass("hidden")==false) {
        $(".evento-farmaco").toggleClass("hidden")
    }
    
    $("#formTipoEvento").on("change", function(e){
        $(".evento-diagnostico").toggleClass("hidden");
        $(".evento-farmaco").toggleClass("hidden");
    });
    
    $("#formTipoEvento option[value='diagnostico']").prop('selected', true);
    $("#formEventoDosisOpcionesSelect option[value='ddd']").prop('selected', true);

    radioSwitcher("eventoRequiereDosis", "formEventoDosisOpciones");
    radioSwitcher("eventoRequiereDuracion","formEventoDuracionOpciones");
    radioSwitcher("eventoUsaFarmaco","addEventoDiagnosisByDrugOptions");
    radioSwitcher("eventoUsaDGP","eventoUsaDGPOpciones");
    
    
    $("#formTipoExposicion").on("change", function(e){
        $(".exposicion-diagnostico").toggleClass("hidden");
        $(".exposicion-farmaco").toggleClass("hidden");
    });

    $("#formTipoExposicion option[value='diagnostico']").prop('selected', true);
    $("#formExposicionDosisOpcionesSelect option[value='ddd']").prop('selected', true);
    
    radioSwitcher("exposicionRequiereDosis", "formExposicionDosisOpciones");
    radioSwitcher("exposicionRequiereDuracion","formExposicionDuracionOpciones");
    radioSwitcher("exposicionUsaFarmaco","addExposicionDrugOptions");
    radioSwitcher("exposicionUsaDGP","exposicionUsaDGPOpciones");
    
    

    

    
    $("#addCovariable").click(function(e){
        e.preventDefault();
        console.log("addCovariable");
        addCovariable("covariables");
    });
    $("#nextCovariable").click(function(e){
        e.preventDefault();
        console.log("nextCovariable");
        numCov = ($("#covariables_1").children().length);
        pointerCov = parseInt($("#punteroCovariable").html());
        console.log(numCov);
        console.log(pointerCov);
        if(pointerCov < numCov) {
            newPointer = pointerCov + 1;
        } else {
            newPointer = numCov;
        }
        $("#punteroCovariable").html(newPointer.toString());
        showCovariable("covariables",newPointer);
    });
    $("#prevCovariable").click(function(e){
        e.preventDefault();
        console.log("prevCovariable");
        numCov = ($("#covariables_1").children().length);
        pointerCov = parseInt($("#punteroCovariable").html());
        console.log(numCov);
        console.log(pointerCov);
        if(pointerCov > 1) {
            newPointer = pointerCov - 1;
        } else {
            if(numCov == 0) {
                newPointer = 0;
            } else {
                newPointer = 1;    
            }
        }
        $("#punteroCovariable").html(newPointer.toString());
        showCovariable("covariables",newPointer);
    });
    $("#delCovariable").click(function(e){
        e.preventDefault();
        pointerCov = parseInt($("#punteroCovariable").html());
        console.log("borrar "+pointerCov);
        delCovariable("covariables",pointerCov);
    });

});
// end of initialize select and radio buttons








$("#formEventoDosisOpcionesSelect").on("change",function(e){
    switch($("#formEventoDosisOpcionesSelect option").filter(":selected").val()) {
        case "manual":
            if($("#formEventoDosisManualOpciones").hasClass("hidden")) {
                $("#formEventoDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formEventoDosisOtrosOpciones").hasClass("hidden")==false) {
                $("#formEventoDosisOtrosOpciones").toggleClass("hidden");
            }
            
            break;
        case "otros":
            if($("#formEventoDosisManualOpciones").hasClass("hidden")==false) {
                $("#formEventoDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formEventoDosisOtrosOpciones").hasClass("hidden")) {
                $("#formEventoDosisOtrosOpciones").toggleClass("hidden");
            }
            break;
        case "ddd":
            if($("#formEventoDosisManualOpciones").hasClass("hidden")==false) {
                $("#formEventoDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formEventoDosisOtrosOpciones").hasClass("hidden")==false) {
                $("#formEventoDosisOtrosOpciones").toggleClass("hidden");
            }
            break;
        default:
            break;
    };
})


$("#formExposicionDosisOpcionesSelect").on("change",function(e){
    switch($("#formExposicionDosisOpcionesSelect option").filter(":selected").val()) {
        case "manual":
            if($("#formExposicionDosisManualOpciones").hasClass("hidden")) {
                $("#formExposicionDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formExposicionDosisOtrosOpciones").hasClass("hidden")==false) {
                $("#formExposicionDosisOtrosOpciones").toggleClass("hidden");
            }
            
            break;
        case "otros":
            if($("#formExposicionDosisManualOpciones").hasClass("hidden")==false) {
                $("#formExposicionDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formExposicionDosisOtrosOpciones").hasClass("hidden")) {
                $("#formExposicionDosisOtrosOpciones").toggleClass("hidden");
            }
            break;
        case "ddd":
            if($("#formExposicionDosisManualOpciones").hasClass("hidden")==false) {
                $("#formExposicionDosisManualOpciones").toggleClass("hidden");
            }
            if($("#formExposicionDosisOtrosOpciones").hasClass("hidden")==false) {
                $("#formExposicionDosisOtrosOpciones").toggleClass("hidden");
            }
            break;
        default:
            break;
    };
})




