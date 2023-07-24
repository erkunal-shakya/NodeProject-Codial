$(document).ready(function() {
    $('.accordion-content').hide();
    // Handle accordion click events
    $('.accordion-heading').click(function() {
      var content = $(this).next('.accordion-content');
      
      // Toggle the content
      content.slideToggle();
      
      // Toggle the active class
      $(this).toggleClass('active');
      
      // Close other open accordion items
      $('.accordion-content').not(content).slideUp();
      $('.accordion-heading').not($(this)).removeClass('active');
    });
  });