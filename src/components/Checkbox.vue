<template>
    <div>
        <input type="checkbox" id="checkBoxShop" @change="onChangeCheck($event)"/>
        <label for="checkBoxShop">
            <div><i class="fa fa-check"></i></div>
            <slot></slot>
        </label>
    </div>
</template>

<script>
    import EventBus from '../event-bus';
    export default {
        name: 'CheckboxShop',
        methods: {
            onChangeCheck(event) {
                EventBus.$emit('changeCheckEvent', event.target.checked);
            }
        }
        
    }
</script>

<style lang="scss" scoped>

    input{ 
        display:none; 
            &:checked+label i{
            color:#FFF;
            opacity:1;
            }
            &:checked+label div{ 
                background:#000; 
            }
    }

    label {
        div{
            width:14px;
            height:14px;
            display:inline-block;
            border:2px solid #000;
            text-align:center;
            line-height:0px;
            margin-right:6px;
            border-radius:2px;
            cursor:pointer;
            background:#FFF; 
        }
        i{ 
            font-size: 14px;
            opacity:0; 
        }
    }

</style>