chrome.runtime.onMessage.addListener(function(msg, id) {
  switch (msg) {
    case 'wake-up':
      $m.show();
      break;
    default:
      console.error('unknown message received from memnon', msg);
  }
});

class Memnon {
  constructor() {
    this.$e        = null;
    this.ext       = null;
    this.selection = null;
  }

  extension(id) {
    this.ext = id.id;
    console.log(chrome.extension.getURL('icon.png'));
  }

  build() {
    let $e = this.$e = $(this.template());
    $e.find(".x").click(function(){ $e.hide(); });
    $('body').keyup(function(e){
      if (!$e.is(':visible')) return;
      switch (e.which) {
        case 27:
          $e.hide();
          break;
      }
    });
  }

  id() {
    return '_ll';
  }

  findPosition() {
    const buffer = 20;
    let yOffset = buffer,
        height  = window.innerHeight - 2 * yOffset;
    if (height < 200) {
      yOffset = 5;
      height = 200;
    }
    let xOffset = window.innerWidth / 2,
        width   = xOffset - yOffset;
    if (width < 200) width = 200;
    let p = {
      top:    window.scrollY + yOffset,
      left:   window.scrollX + xOffset,
      width:  width,
      height: height
    };
    let $goog = $('.gtx-bubble');
    if ($goog.length) {
      let gp        = $goog.position(),
          rightMost = gp.left + $goog.outerWidth(),
          deltaL    = gp.left - window.scrollX,
          deltaR    = window.innerWidth + window.scrollX - rightMost;
      if ( deltaL > deltaR ) {
        p.left = window.scrollX + buffer;
        p.width = gp.left - p.left - buffer + window.scrollX;
      } else {
        p.left = rightMost + buffer;
        p.width = window.innerWidth - p.left - yOffset + window.scrollX;
      }
    }
    return p;
  }

  template() {
    return `
    <div id="${this.id()}">
      <div class="x">&#10005;</div>
      <div class="head">
        <img src="${chrome.extension.getURL('images/owl19.png')}">
        Memnon
      </div>
      <div class="selected">selected</div>
      <div class="found">found</div>
    </div>
    `;
  }

  show() {
    if (!this.$e) {
      this.build();
      $('body').append(this.$e);
    }
    let $e = this.$e;
    // let $translator = $('#translation');
    // this.selection = window.getSelection();
    // console.log($translator);
    // console.log('selection', selection);
    this.$e.css(this.findPosition());
    this.$e.show();
  }

  selection() {
    window.getSelection();
  }
}

var $m = new Memnon();

function selection() {
  return window.getSelection();
}