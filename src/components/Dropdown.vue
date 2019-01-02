<template>
    <div>
        <div class="group">
            <input type="text" :id="id" :name="name" required v-model="inputValue" @click="showOptions">
            <i class="fas fa-caret-down" @click="showOptions"></i>
            <span class="bar"></span>
            <label :label="label">{{ label }}</label>

            <div class="wrap-options">
                <div class="options" v-for="(opt, index) in options" :key="index" v-show="isVisible" @click="showOptions">
                    <div @click="selectOption(opt, index)">
                        <i class="fas fa-check" v-show="optionSelected == index"></i>
                        <span class="option">
                        {{ opt }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DropdownShop',
          props: {
            label: {default: '', type: String},
            id: {default: '', type: String},
            name: {default: '', type: String},
            options: {default: '', type: Array}
          },
        data() {
            return {
                inputValue: this.options[0],
                isVisible: false,
                optionSelected: 0
            }
        },
        methods: {
            showOptions() {
                this.isVisible = !this.isVisible;
            },
            selectOption(option,index) {
                this.inputValue = option;
                this.optionSelected = index;
            }
        },
        created() {
            let vm = this;
            window.addEventListener('click', function(e){
                // close dropdown when clicked outside
                if (!vm.$el.contains(e.target)){
                    vm.isVisible = false
                }
            })
            }
    }
</script>

<style lang="scss" scoped>

        * {
            box-sizing: border-box;
        }

        .group {
            position: relative;
            margin-bottom: 45px;
        }

        input {
            font-size: 18px;
            padding: 10px 10px 10px 5px;
            display: block;
            width: 100%;
            border: none;
            border-bottom: 1px solid #757575;
            &.error-mark {
                border-bottom: 2px solid #dd2c00;
            }
            &:focus {
                outline: none;
            }
            &:focus~label,
            &:valid~label {
                top: -20px;
                font-size: 14px;
                color: #202020;
            }
            &:focus~.bar:before,
            &:focus~.bar:after {
                width: 50%;
            }
        }

        label {
            color: #999;
            font-size: 18px;
            font-weight: normal;
            position: absolute;
            pointer-events: none;
            left: 5px;
            top: 10px;
            transition: 0.2s ease all;
            -moz-transition: 0.2s ease all;
            -webkit-transition: 0.2s ease all;
        }

        .bar {
            position: relative;
            display: block;
            width: 100%;
            &:before,
            &:after {
                content: '';
                height: 2px;
                width: 0;
                bottom: 1px;
                position: absolute;
                background: #202020;
                transition: 0.2s ease all;
                -moz-transition: 0.2s ease all;
                -webkit-transition: 0.2s ease all;
            }
            &:before {
                left: 50%;
            }
            &:after {
                right: 50%;
            }
        }

        .error-text {
            color: #dd2c00;
            font-size: 0.65em;
            font-weight: 500;
            float: left;
        }

        .wrap-options {
            background: #F0F0F0;
            border-radius: 4px;
            text-align: left;
            position: absolute;
            width: 100%;
            top: -10px;
            z-index: 1;
        }

        .options :hover {
            background: #5A9AF7;
            color: white;
            border-radius: 4px;
        }

        .fa-caret-down {
            position: relative;
            top: -23px;
            float: right;
            color: #999;
            cursor:pointer;
        }

        .fa-check {
            font-size: 10px;
            padding-left: 10px;
        }

        .option {
            position: sticky;
            left: 40px;
        }

</style>
