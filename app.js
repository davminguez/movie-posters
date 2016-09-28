$(document).ready(function () {

    $('#term').focus(function () {
        var full = $("#poster").has("img").length ? true : false;
        if (full == false) {
            $('#poster').empty();
        }
    });

    let getPoster = function () {

        var film = $('#term').val();

        if (film == '') {

            $('#poster').html("<h2 class='loading'>Ha! We haven't forgotten to validate the form! Please enter something.</h2>");

        } else {

            $('#poster').html("<h2 class='loading'>Your poster is on its way!</h2>");

            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=ef44c6a53e883f544d32381e66a13327&query=" + film, function (json) {
                console.log('JSON: ', json);

                if (json.results.length) {
                    $('#poster').html("<h2 class='Loading'>We found " + json.results.length + " posters!</h2>");

                    json.results.forEach(function (item) {
                    
                        $('#poster').append($('<img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2' + item.poster_path + '"/>'))

                    });
                }
                else {
                    $('#poster').html("<h2 class='loading'>We couldn't find any movies!<i class='fa fa-frown-o fa-5x' aria-hidden='true'></i></h2>");
                }

            });

        }

        // return false;
    }

    $('#search').click(getPoster);
    $('#term').keyup(function (event) {
        if (event.keyCode == 13) {
            getPoster();
        }
    });

});