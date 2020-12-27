$(document).ready(function(){
  $('html,body').animate({
        scrollTop: $('#main-container').offset().top-100
    }, 'slow');
  
           $('#loginTrigger').click(function(){
$('#loginModal').modal();
           });
           $('#registerTrigger').click(function(){
$('#registerModal').modal();
           }); 
           $('#addarticlebtn').click(function(){
             $('#articleModalForm').modal();
                        });
  $("#articlesearch").on("keyup", function() {
     var value = $(this).val().toLowerCase();
    $("#pet-articles .article-col").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });           
$("#petsearch").on("keyup", function() {
filterpets();
  });
$("#pet-range").on("change", function() {
filterpets();
});
$("#chkfree").on("click", function() {
$("#pet-range").val("-1");
filterpets();
});
        });
function filterpets()
{
  var key = $("#petsearch").val().toLowerCase();
   var l = parseInt($("#pet-range").val());
     var r;
     if(l==50000)
     {
      r=999999;
     }   
    else
    {
      r=l+10000;
    }
    
    $("#petgrid .pet-col").filter(function() {
      var petfee=parseInt($(this).find('.pet-price').text());
      
      if(l==-1)
      {
         var free="";
    if($("#chkfree").prop('checked'))
    {
      free="free";
    }
        $(this).toggle(
        ($(this).text().toLowerCase().indexOf(key) > -1)&&
        ($(this).text().toLowerCase().indexOf(free) > -1)
        )
      }
    else
    {
        $("#chkfree").prop('checked',false)  
        $(this).toggle(
        (petfee>l)&&(petfee<r)&&
        ($(this).text().toLowerCase().indexOf(key) > -1))

    }
    });
}
function showArticle(articles)
{$('#articleModal').modal();
var article = $(articles).find('.petarticle');
var body =article.find('.article-full').text();
var head =article.find('.petarticle-header').text();
var footer =article.find('.blockquote .blockquote-footer').html();
$('#article-head').text(head);
$('#articlemodal-body').text(body);
$('#articlemodal-footer').html(footer);
}

 function disableadoptionfee(checkfree) {
        var petfee = document.getElementById("pet-fee");
        petfee.value=0;
        petfee.disabled = !checkfree.checked ? false : true;
        if (!petfee.disabled) {
            petfee.focus();
            petfee.value=null;
        }
    }
function replaceClass(id, oldClass, newClass) {
  var elem =document.getElementById(id);
  
  if ($(elem).hasClass(oldClass)) {
    $(elem).removeClass(oldClass);
    
  }
  $(elem).addClass(newClass);
}
function hidetoshow(elem) {
    $(elem).removeClass("d-none");
    $(elem).addClass("d-block");
  }
function showtohide(elem) {
    $(elem).removeClass("d-block");
    $(elem).addClass("d-none");
  }
var article = $('#pet-articles').find('.petarticle-body').find('#article-excerpt');
 function excerpt(excerptElement, number , more = "..."){
    excerptElement.each(function(){
    var articlebody = $(this).text(),
    articlebodyExcerpt,
    toArray = articlebody.split("", number),
    joinArray = toArray.join(''),
    joinArrayToArray = joinArray.split(" "),
    joinArrayToArrayPop = joinArrayToArray.pop(),
    joinArrayToArrayPopPush = joinArrayToArray.push(more),
    joinArrayToArrayPopPushJoin = joinArrayToArray.join(' '),
    articlebodyExcerpt = joinArrayToArrayPopPushJoin;
    if(articlebody.length > number){
      articlebody = articlebodyExcerpt;
      $(this).text(articlebody);
    }
    });
  }
  excerpt(article, 200);
$(function() {
    $(document).on("change",".uploadFile", function()
    {
        var uploadFile = $(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;
 
        if (/^image/.test( files[0].type)){
            var reader = new FileReader(); 
            reader.readAsDataURL(files[0]);
 
            reader.onloadend = function(){ 
uploadFile.closest(".imgUp").find('.imagePreview').css("background-image", "url("+this.result+")");
            }
        }
      
    });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function(e) {
      $('#img-prev').attr('src', e.target.result);
      $('#img-prev').removeClass("p-5");
      $('#img-prev').addClass("p-1");
    }
    
    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

$("#pet-img").change(function() {
  readURL(this);
});
$(".toggle-password").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
