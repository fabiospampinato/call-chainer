
/* HELPERS */

type ConditionalKeys<Base, Condition> = NonNullable<{ [Key in keyof Base]: Base[Key] extends Condition ? Key : never; }[keyof Base]>;

type ConditionalPick<Base, Condition> = Pick<Base, ConditionalKeys<Base, Condition>>;

/* MAIN */

type Callback = () => any;

type ConstructorOf<T> = new () => T;

type FN<Arguments extends any[] = any[], Return = any> = ( ...args: Arguments ) => Return;

type Chained1<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, T>;
type Chained2<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained1<T, U>>;
type Chained3<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained2<T, U>>;
type Chained4<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained3<T, U>>;
type Chained5<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained4<T, U>>;
type Chained6<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained5<T, U>>;
type Chained7<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained6<T, U>>;
type Chained8<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained7<T, U>>;
type Chained9<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained8<T, U>>;
type Chained10<T extends FN, U extends {}> = T & Record<keyof ConditionalPick<U, Callback>, Chained9<T, U>>;
type Chained<T extends FN, U extends {}> = Chained10<T, U>; //TODO: Make this infinitely recursive

/* EXPORT */

export type {Chained, ConstructorOf, FN};
