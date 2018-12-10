// Display All Playlists on page
function displayAllPlaylists(data) {
    // for each playlist, draw the following:
    $.each(data.data, function (i) {

        // create element
        var container = $(document.createElement('div')).attr({
            "class": "col-sm-3 mt-auto opacity",
            "id": data.data[i].id,
        });
        var playlistImage = $("<img>").attr({
            "src": data.data[i].image,
            "class": "img-circle person",
            "style": "height:210px;width:210px;"
        });

        // playlist name
        var playlistName = $("<span>").attr({
            'style': 'color:white;',
            'class': 'songName',
        }).text(data.data[i].name);

        // play icon
        var linkPlayIcon = $("<a>").attr({
            "role": "button",
            "class": "playButton centered hideButton",
            "data-id": data.data[i].id,
        });
        var playIcon = $("<span>").attr({
            "class": "glyphicon glyphicon-play img-circle overlay",
            "style": "font-size:28px;color:black;top:18%;left:3%;",
        });

        // delete icon
        var linkdeleteIcon = $("<a>").attr({
            "role": "button",
            "class": "deleteIcon badge badge-pill badge-light hideButton",
            "style": "background-color:Azure",
            "data-id": data.data[i].id,
        })
        var deleteIcon = $("<span>").attr({
            "class": "glyphicon glyphicon-trash overlay",
            "style": "font-size:13px;color:black;",
        });

        // edit icon
        var linkEditIcon = $("<a>").attr({
            "role": "button",
            "class": "editIcon badge badge-pill badge-light hideButton",
            "style": "background-color:Azure;",
            "data-target": "#editFirstModal",
            "data-toggle": "modal",
            "data-id": data.data[i].id,
        })
        var editIcon = $("<span>").attr({
            "class": "glyphicon glyphicon-edit overlay",
            "style": "font-size:13px;color:black;",
        });

        // appending all elements in container

        linkPlayIcon.append(playIcon);
        linkdeleteIcon.append(deleteIcon);
        linkEditIcon.append(editIcon);

        container.append(linkEditIcon);
        container.append(linkdeleteIcon);
        container.append(linkPlayIcon);
        container.append(playlistName);
        var drawPlaylist = container.append(playlistImage);
        $('#playlistsContainer').append(drawPlaylist);
    });
}


// Display the new playlist on page     
function displayNewPlaylist(data) {
    console.log(data.data.image)
    // create element
    var container = $(document.createElement('div')).attr({
        "class": "col-sm-3 mt-auto opacity",
        "id": data.data.id,
    });
    var playlistImage = $("<img>").attr({
        "src": data.data.image,
        "class": "img-circle person",
        "style": "height:210px;width:210px;"
    });

    // playlist name
    var playlistName = $("<span>").attr('style', 'color:white;').text(data.data.name);

    // play icon
    var linkPlayIcon = $("<a>").attr({
        "role": "button",
        "class": "playButton centered hideButton",
        "data-id": data.data.id,
    });
    var playIcon = $("<span>").attr({
        "class": "glyphicon glyphicon-play img-circle overlay",
        "style": "font-size:28px;color:black;top:18%;left:3%;",
    });

    // delete icon
    var linkdeleteIcon = $("<a>").attr({
        "role": "button",
        "class": "deleteIcon badge badge-pill badge-light hideButton",
        "style": "background-color:Azure",
        "data-id": data.data.id,
    })
    var deleteIcon = $("<span>").attr({
        "class": "glyphicon glyphicon-trash overlay",
        "style": "font-size:13px;color:black;",
    });

    // edit icon
    var linkEditIcon = $("<a>").attr({
        "role": "button",
        "class": "editIcon badge badge-pill badge-light hideButton",
        "style": "background-color:Azure;",
        "data-target": "#editFirstModal",
        "data-toggle": "modal",
    })
    var editIcon = $("<span>").attr({
        "class": "glyphicon glyphicon-edit overlay",
        "style": "font-size:13px;color:black;",
    });
    
    // appending all elements in container

    linkPlayIcon.append(playIcon);
    linkdeleteIcon.append(deleteIcon);
    linkEditIcon.append(editIcon);

    container.append(linkEditIcon);
    container.append(linkdeleteIcon);
    container.append(linkPlayIcon);
    container.append(playlistName);
    var drawPlaylist = container.append(playlistImage);
    $('#playlistsContainer').append(drawPlaylist);

}

// Play Music
function playMusic() {
    $('.divPlayer').remove();

    var playerContainer = $("<div>").attr({
        "class": "divPlayer",
    });



    var exitIcon = $("<a>").attr({
        "role": "button",
        "class": "glyphicon glyphicon-remove playerExitIcon",
    })


    var editIcon = $("<a>").attr({
        "role": "button",
        "class": "glyphicon glyphicon-pencil playerEditIcon",
        "data-target": "#editFirstModal",
        "data-toggle": "modal"
    })

    var nowPlaying = `<p id="nowPlaying" style="margin:3%;">NOW PLAYING: <span id="playNow"> </span></p>`

    let audioEl =
        `
        <audio controls autoplay id="audioPlayer" style="position: inherit;top:10px;">    
            <source src=" ">
        </audio>
    `;

    var trackCon = $("<div>").attr("class", "tracks");


    playerContainer.append(editIcon);
    playerContainer.append(exitIcon);
    playerContainer.append(nowPlaying);
    playerContainer.append(trackCon);
    playerContainer.prepend(audioEl);
    $('.playlistPlayer').append(playerContainer);
}

//draw the tracks inside the player
function drawTracks(data) {

    for (let i = 0; i < data.length; i++) {

        let tracks = `<li class="track" data-url="${data[i]['url']}"> ${i+1}. ${data[i]['name']} </li>`;
        $('.tracks').append(tracks);
    }
    $('.tracks li:first').addClass('currentSong');
    playNextSong(data);
};

// draw the name+song inputs inside the edit modal

function drawInputs (data) {
    let urlnId = 0;
    let namenId = 0;
    $('.editWrapper').find('div', function(e)
    { 
        $(this).removeData();
    }) ;
    for (let i = 0; i < data.length; i++) {
        inputsTemp = 
        `
        <div class='inputCouple'>
        <label for="songL" class="col-form-label">Song URL:</label>
        <input type="text" class="songURL" id="songURL${urlnId}" value="${data[i]['url']}">
        <label for="nameL" class="col-form-label">Name:</label>
        <input type="text" class="songName" id="songName${namenId}" value="${data[i]['name']}">
        </div>
        `
        urlnId++;
        namenId++;
        $('.editWrapper').append(inputsTemp);
    }
    

}


