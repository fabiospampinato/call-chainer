
/* IMPORT */

import {Chained, ConstructorOf, FN} from './types';

/* MAIN */

const chainer = <Arguments extends any[], Return extends any, Methods extends {}> ( Methods: ConstructorOf<Methods>, fn: FN<[Methods, ...Arguments], Return> ): Chained<FN<Arguments, Return>, Methods> => {

  const methods = new Methods ();
  const chain = ( ...args: Arguments ): Return => fn ( methods, ...args );

  const keys = Object.keys ( methods );
  const props = Object.getOwnPropertyNames ( Object.getPrototypeOf ( methods ) );
  const names = Array.from ( new Set ([ ...keys, ...props ]) );

  for ( const name of names ) {

    if ( name === 'constructor' ) continue;

    const value = methods[name];

    if ( typeof value !== 'function' ) continue;

    Object.defineProperty ( chain, name, {
      get: () => {
        value.call ( methods );
        return chain;
      }
    });

  }

  return chain as Chained<FN<Arguments, Return>, Methods>;

};

/* EXPORT */

export default chainer;
