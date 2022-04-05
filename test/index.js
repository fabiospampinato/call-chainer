
/* IMPORT */

import {describe} from 'fava';
import chainer from '../dist/index.js';

/* MAIN */

describe ( 'Call Chainer', it => {

  it ( 'works', t => {

    let output = {};

    class Methods {
      flags = {
        always: false,
        skip: false,
        todo: false
      }
      always () {
        this.flags.always = true;
      }
      skip () {
        this.flags.skip = true;
      }
      todo = () => {
        this.flags.todo = true;
      }
    }

    const fn = chainer ( Methods, ( methods, title ) => {
      output = { title, flags: methods.flags };
    });

    fn ( 'Title1' );

    t.deepEqual ( output, { title: 'Title1', flags: { always: false, skip: false, todo: false } } );

    fn.always ( 'Title2' );

    t.deepEqual ( output, { title: 'Title2', flags: { always: true, skip: false, todo: false } } );

    fn.always.todo.skip.skip.todo.always ( 'Title3' );

    t.deepEqual ( output, { title: 'Title3', flags: { always: true, skip: true, todo: true } } );

    fn.todo ( 'Title4' );

    t.deepEqual ( output, { title: 'Title4', flags: { always: false, skip: false, todo: true } } );

  });

});
