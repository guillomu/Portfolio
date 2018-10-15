class Portfolio{

  /**
  * @param (string) selector
  */
  constructor (selector){
    this.activeContent = null;
    this.activeItem = null;
    this.container = document.querySelector(selector);
    if(this.container === null){
      throw new Error(`L'élement $(selector) n'existe pas`)
    }

    this.children = Array.prototype.slice.call(document.querySelectorAll('.js-item'));
    this.children.forEach((child) => {
      child.addEventListener('click', (e) => {
        e.preventDefault();
        this.show(child);
      });

      child.addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
          this.show(child);
        }
      });
    });

    if(window.location.hash.startsWith("#")){
      let element = this.container.querySelector(window.location.hash);
      if(element !== null){
        this.show(element);
      }
    }
  }

  // Lorsque l'on clique sur un projet .js-item
  // On supprime l'élément actif
  // On Clone le project-body .js-body
  // On insère ce clone après mon élément .js-item


  /**
  * Affiche le contenu d'un élément
  * @param (HTMLElement) child
  */
  show(child){
    let offset = 0;
    // Si il y a déjà un élément actif
    // On le masque
    if(this.activeContent !== null){
      this.slideUp(this.activeContent);
      if(this.activeContent.offsetTop < child.offsetTop){
        offset = this.activeContent.offsetHeight;
      }
    }

    if (this.activeItem === child){
      this.activeContent = null;
      this.activeItem = null;
      window.location.hash = '';
    } else {
      let content = child.querySelector('.js-body').cloneNode(true);
      child.after(content);
      this.slideDown(content);
      this.scrollTo(child, offset);
      this.activeContent = content;
      this.activeItem = child;
      if(child.id != ''){
        window.history.pushState(null, null, '#' + child.id);
      }
    }
  }

  /**
  * Affiche l'élément avec un effet d'animation
  * @param (HTMLElement) element
  */
  slideDown(element){
    let height = element.offsetHeight;

    element.style.height = '0px';
    element.style.transitionDuration = '1s';
    element.offsetHeight; // force le repaint
    element.style.height = height + 'px';
    window.setTimeout(function (){
      element.style.height = null;
    }, 1000);
  }

  /**
  * Masque l'élément avec un effet d'animation
  * @param (HTMLElement) element
  */
  slideUp(element){
    let height = element.offsetHeight;

    element.style.height = height + 'px';
    element.style.transitionDuration = '1s';
    element.offsetHeight; // force le repaint
    element.style.height = '0px';
    window.setTimeout(function (){
      element.parentNode.removeChild(element);
    }, 1000);
  }

  /**
  * Fait défiler la fenêtre jusqu'à l'élément
  * @param (HTMLElement) element
  * @param (int) offset
  */
  scrollTo(element, offset = 0){
    window.scrollTo({
      behavior : 'smooth',
      left : 0,
      top : element.offsetTop - offset
    });
  }

}

new Portfolio('#js-portfolio')
