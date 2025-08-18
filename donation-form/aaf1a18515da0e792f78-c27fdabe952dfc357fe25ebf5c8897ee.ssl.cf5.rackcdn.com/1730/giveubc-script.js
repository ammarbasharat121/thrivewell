jQuery(document).ready(function($) {
    /*
    ######################################################################
    # EN custom scripts handling multipage transition process.
    # The form is leveraging EN's validation.
    # 
    # On next page transition, forms need to invoke submit event to trigger
    # EN validations.
    # Tips: <button> element invokes submit event by default. 
    # Submit event is not issued if the button has type="button" attribute.
    ######################################################################
    */
    const MAX_STEP_NUM = $(".step-item").length;

    // IT seems Other Amt ID is not reliable. It changed to have en__field_ prefix when Payment Frequency was turned into hidden field
    // So, instead, use value as selector
    // const otherRadioBtnId = '#transaction_donationAmt5';
    const otherRadioBtnSelector = '.en__field--donationAmt input:radio[value="Other"]';
    const payFreqOneTimeId = '#en__field_transaction_othamt40';
    const payFreqMonthlyId = '#en__field_transaction_othamt41';
    const payrollAmtRadioName = 'input:radio[name="supporter.NOT_TAGGED_57"]';
    const creditAmtRadioName = 'input:radio[name="transaction.donationAmt"]';
    const payFreqRadioName = 'input[name="transaction.othamt4"]';
    const payrollOtherRadioBtnId = '#en__field_supporter_NOT_TAGGED_575';

    const heroImgStickyStartPoint = $(".hero-image-container").offset().top;
    // const footer = $(".footer-university");
    const footer = $(".thinkingblocks-Footer");
    const stepNavContainer = $(".step-nav-container .step-nav");

    var stepNavStickyStartPoint = $(".step-nav-container").offset().top;
    // A flag used to prevent the desktop view hero image from flashing on Chrome when transitioning to next step
    var nextStepTriggeredHero = false;
    // var nextStepTriggeredNav = false;
    var prevContentHeight = $('.content-container').height();
    var newContentHeight;
    var amtDefaultIdxOnBrowserBack = 3;

    // Step transition implementation used by Step navigation menu and Continue/Back button
    $(".step-nav a").on("click", function(event) {
        event.preventDefault();

        var currentStepNum = $(document.body).attr("data-step");
        var targetStep = $(this).parent().index() + 1;
        nextStepTriggeredHero = true;
        // nextStepTriggeredNav = true;

        // Do not change step  if the current step is clicked
        if (currentStepNum != targetStep) {
            // Do not change step by step navigation if users have not been to the step before
            if (this.href) {
                var hp = $(".hero-image-wrapper");
                var heroImgWrapper = $(".hero-image-wrapper");
                var hp = $(".hero-image-wrapper");

                var heroTop = heroImgWrapper.offset().top;
                var heroBottom = heroImgWrapper.offset().top + heroImgWrapper.height();
                var windowTop = window.pageYOffset;
                var hiddenHeroHeight = windowTop - heroTop;

                var target =  $(".r2-col1").offset().top + $(".r2-col1").outerHeight(true);
                
                $("html, body").animate(
                    {
                        scrollTop: target
                    },
                    {
                        duration: 600
                    });
            
                prevContentHeight = $('.content-container').height();

                $(".step" + currentStepNum).hide();
                $(".step" + targetStep).fadeIn();

                newContentHeight = $('.content-container').height();
                var footerTop = footer.offset().top;
                var heightDifference = newContentHeight - prevContentHeight;

                // Detailed class controls to prevent hero image flashing on page transitions
                if(heightDifference > 0 && heightDifference > hiddenHeroHeight ) {
                    // If new step is higher than prev one and hero image is stuck to footer,
                    // make the hero image sticky and stop sticking to the footer, so image does not look jump suddoenly bottom to window top
                    if (windowTop - heroTop > 0) {
                        hp.addClass("sticky-hero");
                        hp.removeClass("sticky-bottom");
                    } 
                } else if(heightDifference < 0 && Math.abs(heightDifference) > hiddenHeroHeight) {
                    // When new step is lower than prev one and hero image is stuck to window top,
                    // if the footer is go above the bottom of the hero image, make the hero image stick to footer, so the footer does not invade the hero image in auto scrolling. 

                    if (heroBottom - footerTop > 0) {
                        hp.removeClass("sticky-hero");
                        hp.addClass("sticky-bottom");
                    } 
                }

                $(document.body).attr("data-step", targetStep);
                // Change active step navigation
                $(".step-nav a").removeClass("active");
                $(this).addClass("active");
            }
        }
    });

    $(".step-back-button").on("click", function(event) {
        $(".step-nav a.active").closest("li").prev().find("a").trigger("click");
    });

    // Initialize
    // Store the current step number to body element
    $(document.body).attr("data-step", 1);

    // Mark the step 1 visited and active
    $(".step-nav a").eq(0).attr("href", "#").addClass("active");

    // Back to the last page when server side validation (Payment methods) failed
    if ($(".en__errorList .en__error").length > 0) {
        $(".step-nav a").attr("href", "#").eq(MAX_STEP_NUM - 1).trigger("click");
    }


    /*
    ##############################################################
    # CVD help script
    ##############################################################
    */
    // Put Tips and Hover target
    $(".en__field--ccvv label").after(
        "<div class=\"cvd-tip\">(?)<div class=\"cvd-prompt\"><span class=\"cvd-tip__text--bold\">CVV or CVD</span> is a security feature to verify you are in possession of your credit card. For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back. For American Express, the four-digit CVV number is printed on the front above the account number.</div></div>"
    );
    
    $(".cvd-tip").on("touchstart", function() {
        $(this).addClass("cvd-hover");
    });
    
    $(".cvd-tip").on("touchend touchcancel", function(event) {
        event.stopPropagation();
        event.preventDefault();
        
        $(this).removeClass("cvd-hover");
    });


    /*
    ##############################################################
    # Accordion script
    # Implement Accordion using visibility and height property,
    # not display to avoid competition with Multipage Script display toggles
    ##############################################################
    */
    $(".other-accordion-button").on("click", function() {
        if($(".other-detail").eq(0).css("visibility") == "hidden") {
            $(".other-detail").addClass("visible");
            $(".other-accordion-button").addClass("other-detail-expand");
        } else {
            $(".other-detail").removeClass("visible");
            $(".other-accordion-button").removeClass("other-detail-expand");
        }
    });
    
    $(".privacy-and-security-accordion-button").on("click", function() {
        if($(".privacy-and-security-detail").eq(0).css("visibility") == "hidden") {
            $(".privacy-and-security-detail").addClass("visible");
            $(".privacy-and-security-accordion-button").addClass("privacy-and-security-detail-expand");
        } else {
            $(".privacy-and-security-detail").removeClass("visible");
            $(".privacy-and-security-accordion-button").removeClass("privacy-and-security-detail-expand");
        }
    });


    /*
    ##############################################################
    # Prepop redirect script
    ##############################################################
    */

    $(".give-by-payroll-section a").on("click", function(event) {
        event.preventDefault();

        // const baseURL = "https://donate.support.ubc.ca/page/19682/data/1";
        const baseURL = $(this).attr('href');

        const directMyGiftField = $("#en__field_transaction_dirgift");
        const directMyGiftFieldValue = directMyGiftField.val();

        var targetDirectMyGiftFieldName = "supporter.NOT_TAGGED_1";

        if (baseURL.indexOf("18682") !== -1) {
			targetDirectMyGiftFieldName = "transaction.dirgift";
        }

        var targetDirectMyGiftFieldValue = directMyGiftFieldValue;

        var prepopParams = [];
        var directURL = baseURL;
        
        if (directMyGiftFieldValue) {
            if (directMyGiftField.is("select") && directMyGiftFieldValue === "Other") {
                targetDirectMyGiftFieldValue = $("input[name=\"transaction.dirgift.other\"]").val();
            }
            
            prepopParams.push({name: targetDirectMyGiftFieldName, value: targetDirectMyGiftFieldValue});
        }
        
        if (prepopParams.length > 0) {
            if(directURL.indexOf("?mode=DEMO") !== -1) {
                directURL += '&' + $.param(prepopParams);
            } else {
                directURL += "?" + $.param(prepopParams);
            }
        }

        window.location.href = directURL;
    });


    /*
    ##############################################################
    # Step navigation hover script
    ##############################################################
    */
    // Flag to detect whether running on touch devices and
    // prevent hover effect from continueing being effective
    // after touch
    var touched = false;
        
    $(".step-item a")
        .on("touchstart", function() {
            touched = true;
        })
        .on("touchend", function() {
            $(this).removeClass("nav-hover");
        });

    $(".step-item a").hover(function(){
        if(!touched) {
            $(this).addClass("nav-hover");
        }
    }, function() {
        $(this).removeClass("nav-hover");
    });

    // enOnSubmit is a hook of EN. Fired when EN's frontend validations were all passed
    // Returning false in this hook prevents the form submission
    window.enOnSubmit = function(){
        const currentStepNum = parseInt($(document.body).attr("data-step"));

        // If the current step is the last step, let the form submit
        if (currentStepNum == MAX_STEP_NUM) {
            return true;
        }

        goNextStep(currentStepNum);

        return false;
    }

    // enOnError is a hook of EN. Fired when EN's frontend validations had at least one error.
    // Return value is ignored.
    // NOTE: EN validations are executed against all of the steps, not only the current step.
    // Therefore, if the current step has no error but the other steps has, need to go to
    // next step page.
    window.enOnError = function(){
        const currentStepNum = parseInt($(document.body).attr("data-step"));
        const currentStep = $(".step" + currentStepNum);

        // If there is any validation error on current step, do nothing
        if (currentStep.find(".en__field__error").length) {
            return;
        }

        goNextStep(currentStepNum);
    }

    function goNextStep(currentStepNum) {
        const nextStepNum = currentStepNum + 1;
        const nextStep = $(".step" + nextStepNum);

        // Remove errors in the next step not to display unnecessary errors when users go to the step the first time
        // This process is necessary since EN validates all step fields when continue button is pressed
        nextStep.find(".en__field__error").remove();
        // Mark the next step visited, and click the next step navigation
        $(".step-nav a.active").closest("li").next().find("a").attr("href", "#").trigger("click");
    }

    window.onscroll = function() {
        changeStickyHeroState();
        changeStickyNavState();
    }

    window.onresize = function() {
        stepNavStickyStartPoint = $(".step-nav-container").offset().top;
        prevContentHeight = $('content-container').height();
        
        changeStickyHeroState();
        changeStickyNavState();
    }

    function changeStickyHeroState() {
        var heroImgWrapper = $(".hero-image-wrapper");
        var hp = $(".hero-image-wrapper");
        var footerOffset = footer.offset().top;
        var heroHeight = heroImgWrapper.height();

        // The controls using nextStepTriggered flag is necessary to prevent hero image flashing on page transitions
        if (window.pageYOffset + heroHeight > footerOffset) {
            // stick to footer
            if(nextStepTriggeredHero) {
                return;
            }
            hp.removeClass("sticky-hero");
            hp.addClass("sticky-bottom");
        } else if (window.pageYOffset > heroImgStickyStartPoint) {
            // stick to window top
            // When the hero image is stick, can reset the flag for preventing flashing and let scritp controll sticky elements normally
            nextStepTriggeredHero = false;
            
            hp.addClass("sticky-hero");
            hp.removeClass("sticky-bottom");
        } else {
            // This flag is used to prevent the desktop view hero image from flashing due to Scroll Anchoring on Chrome when transitioning to next step
            // (Scroll Anchoring move the scroll bar position almost near the doc top when step elementes are hidden)
            if(nextStepTriggeredHero) {
                return;
            }

            // remove sticky status (stick to the container top)
            hp.removeClass("sticky-hero");
            hp.removeClass("sticky-bottom");
        }
    }

    function changeStickyNavState() {
        var footerOffset = footer.offset().top;
        var stepNavHeight = stepNavContainer.height();

        if (window.pageYOffset + stepNavHeight > footerOffset) {
            stepNavContainer.removeClass("sticky-nav");
            stepNavContainer.addClass("sticky-bottom");
        } else if (window.pageYOffset > stepNavStickyStartPoint) {
            // nextStepTriggeredNav = false;
            stepNavContainer.addClass("sticky-nav");
            stepNavContainer.removeClass("sticky-bottom");
        } else {
            // if(nextStepTriggeredNav) {
            //     return;
            // }
            stepNavContainer.removeClass("sticky-nav");
            stepNavContainer.removeClass("sticky-bottom");
        }
    }

    function addOtherAmtListener() {
        const otherRadioBtn = $(otherRadioBtnSelector);
        const payrollOtherRadioBtn = $(payrollOtherRadioBtnId);
        
        $(creditAmtRadioName + ', ' + payrollAmtRadioName).change(function() {
            if($(this).val() == 'Other'){ 
                $(this).parent('.en__field__item').hide();

                // The fake input below is specifically for iOS to let OS focus on the other amount input field when Others button is clicked
                // create invisible dummy input to receive the focus first
                const fakeInput = document.createElement('input');
                fakeInput.setAttribute('type', 'text');
                fakeInput.style.position = 'absolute';
                fakeInput.style.opacity = 0;
                fakeInput.style.height = 0;
                fakeInput.style.fontSize = '16px';// disable auto zoom

                $('.en__field--donationAmt, .en__field--NOT_TAGGED_57').append(fakeInput);

                // focus so that subsequent async focus will work
                fakeInput.focus();

                // Need to release the JS thread, so EN script can eanable the hidden field first
                // If focus() run before that, the DOM element is not going to be focused since it's disabled
                setTimeout(function() {
                    // Without fakeInput.focus() above, this focus does not work on iOS Safari due to its specific behavior
                    // By chaecking empty value, avoid the other input field gets focous on page back if it has value
                    if($('.en__field--donationAmt .en__field__input--other').val() === "") {
                        $('.en__field--donationAmt .en__field__input--other').focus();
                    }
                    if($('.en__field--NOT_TAGGED_57 .en__field__input--other').val() === "") {
                        $('.en__field--NOT_TAGGED_57 .en__field__input--other').focus();
                    }
                    $(fakeInput).remove();
                }, 0);
            } else {
                otherRadioBtn.parent('.en__field__item').show();
                payrollOtherRadioBtn.parent('.en__field__item').show();
            }
        });
    }

    $(payFreqRadioName).change(function() {
        // Need to release the JS thread to let EN's JS script run first to generate new amount DOM elements
        // Any interaction for new elements like event listener registration needs to happen after the DOM generation
        setTimeout(function() {
            const otherRadioBtn = $(otherRadioBtnSelector);

            if(!otherRadioBtn.prop("checked")) {
                otherRadioBtn.parent('.en__field__item').show();
            }

            addOtherAmtListener();
        }, 0);
    });

    // Need to release the JS thread since EN's JS needs to run first
    // The execution order seems to vary depending on browsers. Chrome: EN->CustomJS Firefox CustomJS->EN
    setTimeout(function() {
        addOtherAmtListener();
        const otherRadioBtn = $(otherRadioBtnSelector);

        // Other btn is hidden by default CSS to ease content flushing
        // Need to display it if other amt btn was selected at first
        if(otherRadioBtn.prop("checked")) {
            otherRadioBtn.parent('.en__field__item').hide();
        } else {
            otherRadioBtn.parent('.en__field__item').show();
        }
    }, 0);

    // On page back, EN's show/hide control does not run properly. (such as displaying the Other input field when Other radio btn is checked)
    // The montly/one-time amount change on payment frequency change does work too.
    // To solve this, anytime visit the donation page, invoke payment frequency click event.
    // For those pages do not have payment frequency radio btns, these operations do nothing.
    if($(payFreqRadioName + ':checked').val() == 'One Time') {
        setTimeout(function() {
            // Clicking the payment frequency button again to make sure the amount btns are changed properly on browser page back
            $(payFreqOneTimeId).prop('checked', false).trigger('click');
        }, 0);
    } else {
        setTimeout(function() {
            // Clicking the payment frequency button again to make sure the amount btns are changed properly on browser page back
            $(payFreqMonthlyId).prop('checked', false).trigger('click');
            $(creditAmtRadioName + ':checked').prop('checked', false).trigger('click');

            // Clickihng the payroll other btn again to make sure the other Input field is opened and the other btn is hidden on browser page back or coming with amt prepop
            $(payrollAmtRadioName + ':checked').prop('checked', false).trigger('click');
        }, 0);
    }

    /*
    ##############################################################
    # Give UBC footer DAE section script
    ##############################################################
    */
    const mobileCollapseCols = $('.thinkingblocks-Footer .js-mobile-collapse');

    for (let col of mobileCollapseCols) {
        // const toggle = col.getElementsByTagName('b')[0];
        const toggle = $('b', col);

        // toggle.addEventListener('click', () => {
        toggle.on('click', () => {
            // if (col.classList.contains('expanded'))
            if ($(col).hasClass('expanded'))
                // col.classList.remove('expanded');
                $(col).removeClass('expanded');
            // else col.classList.add('expanded');
            else $(col).addClass('expanded');
        })
    }

    const topBtn = $('.thinkingblocks-Footer .top-btn');
    topBtn.on('click', function() {
        $("html, body").animate({ scrollTop: 0 });
    });
});
