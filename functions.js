//create array for songs and push them to database 
function buildSongsJSON() {
    songsArray = [];
    $('.inputCouple').each(function () {

        var songName = $(this).find('.songName').val();
        var songUrl = $(this).find('.songURL').val();
        if (!songName || !songUrl) {
            return;
        }

        songsArray.push({
            "name": songName,
            "url": songUrl
        }, )

    });
    return songsArray;
}

// Close Player Button 
$(function () {
    $(document).on("click", '.playerExitIcon', function () {
        $(this).closest("div").fadeOut(function () {
            $(this).remove();
        });

    });
});


// Play first and next songs
function playNextSong(songs) {
    var currentSong = 0;

    ////// Play first song //////
    $('#audioPlayer')[0].src = songs[0]['url'];
    // $('#playNow').append(songs[0]['name']);
    $('#audioPlayer')[0].play();

    // Click track to change song
    $('.track').click(function (e) {
        e.preventDefault();
        $('#audioPlayer')[0].src = $(this).attr('data-url');
        $('.track').removeClass("currentSong");
        currentSong = $(this).parent().index();
        $(this).addClass("currentSong");
    });
    // When song duration is ended, play next song
    $("#audioPlayer")[0].addEventListener("ended", function () {
        currentSong++;
        if(currentSong == $(".track").length)
            currentSong = 0;
        $('.track').removeClass("currentSong");
        $(".tracks li:eq("+currentSong+")").addClass('currentSong');
        $('#audioPlayer')[0].src = songs[currentSong]['url'];
    });
}

// Reset modal field
function resetField() {
    $('form :input').val('');
}

// Clear field when closing
function clearField() {
    $(".editWrapper").find('.inputCouple').remove();
}

// Add another input in the songs modal
$(document).ready(function () {
    const max_inputs = 30; //maximum input boxes allowed
    const wrapper = $(".wrapper");
    const add_button = $("#add_field_button");
    var x = 1;
    var nId = 3;
    $(add_button).click(function (e) {
        e.preventDefault();

        if (x < max_inputs) { //max inputs box allowed
            x++;
            $(wrapper).append('<div class="inputCouple"> <label for="songL" class="col-form-label">Song URL:</label> <input type="text" class="songURL" id="songURL' + nId + '"> <label for="songName" class="col-form-label">Name:</label> <input type="text" class="songName" id="songName' + nId + '"></div>');
            nId++;
        } else {
            $(wrapper).append('<div class="alert alert-danger" role="alert"> Cannot add more fields </div>')
        }
    });

});


// Search Option
$(document).ready(function(){
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#playlistsContainer div").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


// Edit Icon 
$(function () {
    // First Modal //
    var buttId;
    var $playlistName = $('#editPlaylist-name');
    var $playlistImage = $('#editPlaylist-image');

    $( "#playlistsContainer" ).delegate('.editIcon', 'click', function() {
        buttId = $(this).attr('data-id');
        let divCon = $(this).closest('div');

        const currentName = divCon.find('.songName').text();
        const currentImg = divCon.find('img').prop('src');
        $("#editFirstModal #editPlaylist-name").val(currentName);
        $("#editFirstModal #editPlaylist-image").val(currentImg);
      });
    // Second Modal after pressing next //
    $("#editFirstModal").click('#editNext', function () {
        $.ajax({
            type: 'GET',
            url: 'api/playlist/' + buttId + '/songs',
            success: function (data) {
                drawInputs(data.data.songs);
            }
        });
    });
    // Save and update playlist //
    $('#saveAndUpdate').on('click', function () {
        
        var editPlaylist = {
            "name": $playlistName.val(),
            "image": $playlistImage.val(),
        }
       
        $.ajax ({
            type: 'POST',
            url: 'api/playlist/'+buttId,
            data: editPlaylist,
            success: function () {
                console.log("work1");
            }
        });
        buildSongsJSON();
        var editSongs = songsArray;

        $.ajax ({
            type: 'POST',
            url: 'api/playlist/'+buttId+'/songs',
            data: editSongs,
            success: function () {
                console.log("work2");
            }
        })
        
    });
});
