
/* IMPORT */

import type {Chained, ConstructorOf, FN} from './types';

/* MAIN */

const chainerBase = <Arguments extends any[], Return extends any, Methods extends Record<string, any>> ( Methods: ConstructorOf<Methods>, fn: FN<[Methods, ...Arguments], Return>, cloned: boolean ): Chained<FN<Arguments, Return>, Methods> => {

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
        if ( cloned ) {
          value.call ( methods );
          return chain;
        } else {
          const clone = chainerBase ( Methods, fn, true );
          return clone[name];
        }
      }
    });

  }

  return chain as Chained<FN<Arguments, Return>, Methods>;

};

const chainer = <Arguments extends any[], Return extends any, Methods extends Record<string, any>> ( Methods: ConstructorOf<Methods>, fn: FN<[Methods, ...Arguments], Return> ): Chained<FN<Arguments, Return>, Methods> => {

  return chainerBase ( Methods, fn, false );

};

/* EXPORT */

export default chainer;
