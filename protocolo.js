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
    console.log(diagnostico,target);
    
};

addDrug = function(farmaco, target) {
    $("#"+target).append("<div class=\"farmaco\"><button class=\" btn btn-danger-outline btn-sm borrar-elemento\"><span class=\"glyphicon glyphicon-trash \" aria-hidden=\"true\"></span></button><span> </span>"+farmaco+"</div>");
    
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
        default:
            $(document.body).data("botonesListaTarget", "no_target" );
            break;
    }
});





