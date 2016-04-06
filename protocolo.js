
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


