
$(function () {
    var $playlistName = $('#playlist-name');
    var $playlistImage = $('#playlist-image');

    // Get All Playlists
    $.ajax({
        type: 'GET',
        url: 'api/playlist',

        success: function (data) {
            displayAllPlaylists(data);
        },

        error: function () {
            alert('error loading playlists');
        }
    });

    // Create New Playlist
    $('#createNewPlaylist').on('click', function () {
        
        buildSongsJSON();

        var newPlaylist = {
            "name": $playlistName.val(),
            "image": $playlistImage.val(),
            "songs": songsArray
        }

        $.ajax({
            type: 'POST',
            url: 'api/playlist',
            data: newPlaylist,
            success: function (id) {
                callSpecificPlaylist(id);
            },

            error: function () {
                alert('error saving new playlist');
            }
        })

        function callSpecificPlaylist(id) {
            $.ajax({
                type: 'GET',
                url: 'api/playlist/' + id.data.id,
                success: function (data) {
                    displayNewPlaylist(data);
                    console.log(data.data);
                    
                }
            })
        }
    });

    // Get Playlist Songs
    $('.container').delegate('.playButton', 'click', function () {
        $.ajax({
            type: 'GET',
            url: 'api/playlist/' + $(this).attr('data-id') + '/songs',
            success: function (data) {
                playMusic(data);
                drawTracks(data.data.songs);
            }
        })
    });


    // Deleting existing playlist
    $('#playlistsContainer').delegate('.deleteIcon', 'click', function () {

        const $divList = $(this).closest('div');
        if (window.confirm("Are you sure?")) {
            $.ajax({
                type: 'DELETE',
                url: 'api/playlist/' + $(this).attr('data-id'),
                success: function () {
                    $divList.fadeOut(300, function () {
                        $(this).remove();
                    });
                }
            });
        }
        
    });

   
});

