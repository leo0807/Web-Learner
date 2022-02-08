# vuex-class
[Github Official Site](https://github.com/ktsn/vuex-class/)
```
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class';

const someModule = namespace('path/to/module');

@Component
export class MyComp extends Vue{
  @State('foo') stateFoo
  @State(state => state.bar) stateBar
  @Getter('foo') getterFoo
  @Action('foo') actionFoo
  @Mutation('foo') mutationFoo
  @someModule.Getter('foo') moduleGetterFoo

  // 如果参数被忽略了， 则可以对每一个state/getter/action/mutation type使用属性名称
  @State foo
  @Getter bar
  @Action baz
  @Mutation qux

  created(){
    this.stateFoo // => store.state.foo
    this.stateBar // => store.state.bar
    this.getterFoo // => store.getters.foo
    this.actionFoo({ value: true }) // => store.dispatch('foo', { value: true })
    this.mutationFoo({ value: true }) // => store.commit('foo', { value: true })
    this.moduleGetterFoo // => store.getters['path/to/module/foo']
  }
}
```