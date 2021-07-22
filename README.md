# Call Chainer

Combine a regular function and a class so that methods of the class become chainable properties of the function that get called automatically.

## Install

```sh
npm install --save call-chainer
```

## Usage

```ts
import chainer from 'call-chainer';

// First of all you need a class containing some methods
// It can contain non-methods too, those are not attached to the function

class Methods {
  flags = {
    always: false,
    skip: false,
    todo: false
  }
  always = () => {
    this.flags.always = true;
  }
  skip = () => {
    this.flags.skip = true;
  }
  todo = () => {
    this.flags.todo = true;
  }
}

// Then you need a function
// The function must receive as its first argument an instance of Methods
// That first argument is not exposed in the final chained function

const fn = ( methods: Methods, title: string ) => {
  console.log ( title );
  console.log ( methods.flags );
};

// Finally you need to chain the two together to get a new, chained, function

const fnChained = chainer ( Methods, fn );

// Then you can call methods on the chained function just by retrieving them as properties

fnChained.always.skip ( 'My title' );
// => 'My Title'
// => { always: true, skip: true, todo: false }

fnChained ( 'My title' );
// => 'My Title'
// => { always: false, skip: false, todo: false }
```

## License

MIT © Fabio Spampinato
