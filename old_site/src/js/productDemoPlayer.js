import Plyr from 'plyr';

export const ProductDemoPlayer = {
  init() {
    new Plyr('#product-demo', {
      controls: ['play-large'],
    });
  },
};
