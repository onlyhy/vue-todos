import { App }from "vue"
import {Button} from 'vant';
const plugins = [Button]
export const vantPlugin = {
    install:function(vm:App):void{
        plugins.forEach(item=>{
            vm.component(item.name,item)
        })
    }
}