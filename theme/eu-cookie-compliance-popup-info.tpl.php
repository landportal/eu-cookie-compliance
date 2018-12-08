<?php

/**
 * @file
 * This is a template file for a pop-up prompting user to give their consent for
 * the website to set cookies.
 *
 * When overriding this template it is important to note that jQuery will use
 * the following classes to assign actions to buttons:
 *
 * agree-button      - agree to setting cookies
 * find-more-button  - link to an information page
 *
 * Variables available:
 * - $message:  Contains the text that will be display within the pop-up
 * - $agree_button: Label for the primary/agree button. Note that this is the
 *   primary button. For backwards compatibility, the name remains agree_button.
 * - $disagree_button: Contains Cookie policy button title. (Note: for
 *   historical reasons, this label is called "disagree" even though it just
 *   displays the privacy policy.)
 * - $secondary_button_label: Contains the action button label. The current
 *   action depends on whether you're running the module in Opt-out or Opt-in
 *   mode.
 * - $primary_button_class: Contains class names for the primary button.
 * - $secondary_button_class: Contains class names for the secondary button
 *   (if visible).
 */
?>

<style>

#sliding-popup .popup-content #popup-text {
  width: 60%;
  text-align: unset !important;
}

#popup-buttons h2, #popup-buttons p {
  color:#fff !important;
}

.popup-content-inner {
  padding-left: 0px;
  padding-right: 20px;
}

.mySlides {
  display: none;
  box-sizing: border-box;
 }


/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
  height: auto;
  box-sizing: border-box;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  box-sizing: border-box;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
  box-sizing: border-box;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
  box-sizing: border-box;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  bottom: 8px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  box-sizing: border-box;
}

#popup-text h1,
#popup-text h2,
#popup-text h3,
#popup-text h4,
#popup-text h5,
#popup-text h6 {
color:#fff;
}

/* The dots/bullets/indicators */
#popup-text .dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  box-sizing: border-box;
}

#popup-text .active, #popup-text .dot:hover {
  background-color: #717171;
  box-sizing: border-box;
}

/* Fading animation */
#popup-text .fade-anim {
  -webkit-animation-name: fade-anim;
  -webkit-animation-duration: 1.5s;
  animation-name: fade-anim;
  animation-duration: 1.5s;
  box-sizing: border-box;
}

@-webkit-keyframes fade-anim {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade-anim {
  from {opacity: .4}
  to {opacity: 1}
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
#sliding-popup .popup-content #popup-text {
  width:100%;
}
</style>


<div>
  <div class ="popup-content info">

    <div id="popup-text">
      <div class="popup-content-inner">
        <div class="slideshow-container">

        <div class="mySlides fade-anim">
          <div class="text"><?php print $message ?></div>
        </div>

        <div class="mySlides fade-anim">
          <div class="text"><?php print $message_1 ?></div>
        </div>

        <div class="mySlides fade-anim">
          <div class="text"><?php print $message_2 ?></div>
        </div>

        <span class="prev" data-id="-1">&#10094;</span>
        <span class="next" data-id="1">&#10095;</span>

        </div>

        <br>

        <div style="text-align:center">
          <span class="dot" data-id="0"></span>
          <span class="dot" data-id="1"></span>
          <span class="dot" data-id="2"></span>
        </div>

    </div> <!-- end of popup-content-inner-->

    </div>

    <div id="popup-buttons">
      <button type="button" class="<?php print $primary_button_class; ?>"><?php print $agree_button; ?></button>
      <?php if ($secondary_button_label) : ?>
        <button type="button" class="<?php print $secondary_button_class; ?>" ><?php print $secondary_button_label; ?></button>
      <?php endif; ?>
    </div>

  </div>
</div>
