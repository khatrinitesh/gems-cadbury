$(document).ready(function() {
    // START < CLICK CTA ICON CLOSE THEN IT IS CLOSED SUB STEM AND UNCHECKED BG HIGHLIGHT COLOR
    $(function(){
        $('.btnClosePagination').click((event) => { 
            $(event.target).parents('.targetDiv').hide();
            if ($(':checkbox').is(':checked')){
                $(':checkbox').prop('checked', false).attr('checked','checked');
            }
            else {
                $(':checkbox').prop('checked', true)
            }
          });
    });
    // END < CLICK CTA ICON CLOSE THEN IT IS CLOSED SUB STEM AND UNCHECKED BG HIGHLIGHT COLOR

    // START > MUSIC PLAYER CHECKBOX INSTRUMENT 
    $(function(){
        $('input.field_chk_instrument').on('change', function() {
            checkedFunc("instrument1", "instrument2","instrument3","instrument4","instrument5","instrument6","instrument7");

            function checkedFunc(element1Id, element2Id,element3Id,element4Id,element5Id,element6Id,element7Id) {
                var mybutton = document.getElementById("btnDone");
                var element1 = document.getElementById(element1Id);
                var element2 = document.getElementById(element2Id);
                var element3 = document.getElementById(element3Id);
                var element4 = document.getElementById(element4Id);
                var element5 = document.getElementById(element5Id);
                var element6 = document.getElementById(element6Id);
                var element7 = document.getElementById(element7Id);
                if (element1.checked == true && element2.checked == true && element3.checked == true && element4.checked == true && element5.checked == true && element6.checked == true && element7.checked == true) {
                    mybutton.removeAttribute("disabled");
                } else {
                    mybutton.setAttribute("disabled", "disabled");
                }
            }

            if($(this).prop("checked") == true) {
                console.log("Checkbox is checked.");
              }
              else if($(this).prop("checked") == false) {
                console.log("Checkbox is unchecked.");
              }
            $(".targetDiv").hide();
            $(".field_chk_instrument:checked").each(function(){
                $(".targetDiv").hide();
                $("#"+$(this).attr('data-target')).show();
            });
        });
    });
    // END > MUSIC PLAYER CHECKBOX INSTRUMENT 

    // START MANY POPUP - PORTAIT AND LANDSCAPE
    $(function() {
        // START > POPUP ROTATE SCREEN
        $(function(){
            $(".modal_rotate").modal('hide');
        });
        // END < POPUP ROTATE SCREEN

        // START GET OTP AND ROTATE SCREEN HORIZONTAL 
        $(function() {
            $("#modalImageCaption").modal('show');
            $(".modal-backdrop").addClass('modal_backdrop_landscape');
        });
        $("#btnGetOtp").click(function() {
            $(".modal-backdrop").addClass('modal_backdrop_landscape');
        });
        // POPUP FOR hiding OTP modal & showing for ROTATE SCREEN
        $("#btnOtpSubmit").click(function() {
            $("#otpModal").modal('hide');
        });
        // END GET OTP AND ROTATE SCREEN HORIZONTAL 

        // POPUP FOR CREATE NEW USER 1 AND 2 
        $("#btnCreateNew1").click(function() {
            // $(".modal-backdrop").addClass('modal_backdrop_active');
            $(".modal-backdrop").addClass('modal_backdrop_portait');
        });
        $("#btnCreateNew2").click(function() {
            // $(".modal-backdrop").addClass('modal_backdrop_active');
            $(".modal-backdrop").addClass('modal_backdrop_portait');
        });
        // POPUP FOR CREATE NEW USER 1 AND 2 

        // START POPUP LOADER & SONG
        $("#btnDone").click(function() {
            $('#modalLoader').delay(1000).fadeOut(1000);
            setTimeout(function() {
                $('#modalLoader').modal("hide");
                $("#modalSong").modal('show');
                $(".modal-backdrop").addClass('modal_backdrop_portait');
            }, 1500);
        });
        $("#btnDownload").click(function() {
            $("#modalSong").modal('hide')
            $("#modalDownload").modal('show')
            $(".modal-backdrop").addClass('modal_backdrop_portait');
        });
        $("#btnDownloadAge").click(function() {
            $("#rotateScreenModal").modal('hide');
            $(".modal-backdrop").addClass('modal_backdrop_landscape');
        });
        // END POPUP LOADER & SONG


        // START POPUP CLICK BTN >> CREATE NEW AND QUICK CREATE
        $("#btnQuickCreate").click(function() {
            $("#modalCreateNew1").modal('hide');
            $("#step_landscape").hide();
            $("#content_landscape").show();
        });
        $("#btnCreateNew").click(function() {
            $("#modalCreateNew2").modal('hide');
            $("#step_landscape").hide();
            $("#content_landscape").show();
        });
        $("btn_ClsCreateNew").click(function() {
            $("#modalCreateNew2").modal('hide');
        });
        // END POPUP CLICK BTN >> CREATE NEW AND QUICK CREATE
    });
    // END MANY POPUP - PORTAIT AND LANDSCAPE

    // START CUSTOM SCROLLBAR VERTICAL
    $(function() {
        $(window).on("load", function() {
            $(".vertical_scrollbar").mCustomScrollbar();
        });
    });
    // END CUSTOM SCROLLBAR VERTICAL

    // START > AUDIO PLAYER
    $(function() {
        const audioPlayer = document.querySelector(".audio-player");
        const audio = new Audio(
            "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
        );
        //credit for song: Adrian kreativaweb@gmail.com

        console.dir(audio);
        audio.addEventListener(
            "loadeddata",
            () => {
                audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                    audio.duration
                );
                audio.volume = .75;
            },
            false
        );

        //click on timeline to skip around
        const timeline = audioPlayer.querySelector(".timeline");
        timeline.addEventListener("click", e => {
            const timelineWidth = window.getComputedStyle(timeline).width;
            const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
            audio.currentTime = timeToSeek;
        }, false);

        //click volume slider to change volume
        const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
        volumeSlider.addEventListener('click', e => {
            const sliderWidth = window.getComputedStyle(volumeSlider).width;
            const newVolume = e.offsetX / parseInt(sliderWidth);
            audio.volume = newVolume;
            audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
        }, false)

        //check audio percentage and update time accordingly
        setInterval(() => {
            const progressBar = audioPlayer.querySelector(".progress");
            progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
            audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                audio.currentTime
            );
        }, 500);

        //toggle between playing and pausing on button click
        const playBtn = audioPlayer.querySelector(".controls .toggle-play");
        playBtn.addEventListener(
            "click",
            () => {
                if (audio.paused) {
                    playBtn.classList.remove("play");
                    playBtn.classList.add("pause");
                    audio.play();
                } else {
                    playBtn.classList.remove("pause");
                    playBtn.classList.add("play");
                    audio.pause();
                }
            },
            false
        );

        audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
            const volumeEl = audioPlayer.querySelector(".volume-container .volume");
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeEl.classList.remove("icono-volumeHigh");
                volumeEl.classList.add("icono-volumeMute");
            } else {
                volumeEl.classList.add("icono-volumeHigh");
                volumeEl.classList.remove("icono-volumeMute");
            }
        });

        //turn 128 seconds into 2:08
        function getTimeCodeFromNum(num) {
            let seconds = parseInt(num);
            let minutes = parseInt(seconds / 60);
            seconds -= minutes * 60;
            const hours = parseInt(minutes / 60);
            minutes -= hours * 60;

            if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
            return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                seconds % 60
            ).padStart(2, 0)}`;
        }
        // END > AUDIO PLAYER   
    });
    // END > AUDIO PLAYER

    // POPUP FOR DEFAULT SHOWING - IMAGE AND CAPTION
    $(function() {
        $("#btnClsImgCap").click(function() {
            $("#step1").css('display', 'block');
            $("#step2").css('display', 'none');
        });
    });

    // OTP INPUT NUMBER VALIDATION 
    $(function() {
        console.clear();
        let inputs = document.querySelectorAll(".otp_input");
        let values = Array(4);
        let clipData;
        inputs[0].focus();

        inputs.forEach((tag, index) => {
            tag.addEventListener('keyup', (event) => {
                if (event.code === "Backspace" && hasNoValue(index)) {
                    if (index > 0) inputs[index - 1].focus();
                }

                //else if any input move focus to next or out
                else if (tag.value !== "") {
                    (index < inputs.length - 1) ? inputs[index + 1].focus(): tag.blur();
                }

                //add val to array to track prev vals
                values[index] = event.target.value;
            });

            tag.addEventListener('input', () => {
                //replace digit if already exists
                if (tag.value > 10) {
                    tag.value = tag.value % 10;
                }
            });

            tag.addEventListener('paste', (event) => {
                event.preventDefault();
                clipData = event.clipboardData.getData("text/plain").split('');
                filldata(index);
            })
        })

        function filldata(index) {
            for (let i = index; i < inputs.length; i++) {
                inputs[i].value = clipData.shift();
            }
        }

        function hasNoValue(index) {
            if (values[index] || values[index] === 0)
                return false;

            return true;
        }
    });
    // BELOW CODE > OPEN AND CLOSE FOR SIDEBAR AND OVERLAY AND MENU HAMBURGER >> all devices for portrait and landscape 
    $(function() {
        $("#btn_MenuHamburger").click(function() {
            $("#overlay").addClass('overlay_open')
            $("#sidebar").addClass('sidebar_open')
        });
        $("#btn_menu").click(function() {
            $("#overlay").addClass('overlay_open')
            $("#sidebar").addClass('sidebar_open')
        });
        $("#btn_close").click(function() {
            $("#overlay").removeClass('overlay_open')
            $("#sidebar").removeClass('sidebar_open')
        });
    });

});