<template>
    <div class="custom-radios">
        <input type="radio" :id="id" class="color-2" name="radioGroup" @change="onChangeCheck($event)">
        <label :for="id">
            <slot></slot>
            <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
            </span>
        </label>
    </div>
</template>

<script>
    import EventBus from '../event-bus';
    export default {
        name: 'Radio',
        props: {
            id: { default: '', type: String }
        },
        methods: {
            onChangeCheck(event) {
                EventBus.$emit('changeRadioEvent', event.target);
            }
        }

    }
</script>

<style lang="scss" scoped>
    // Colors
    $color-1: #2ecc71;
    $color-2: #3498db;
    $color-3: #f1c40f;
    $color-4: #e74c3c;

    .custom-radios {
        display: inline-block;
        div {
            display: inline-block;
        }

        input[type="radio"] {
            display: none;

            +label {
                color: #333;
                font-size: 14px;

                span {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin: -1px 4px 0 0;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 50%;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);
                    background-repeat: no-repeat;
                    background-position: center;
                    text-align: center;
                    line-height: 44px;

                    img {
                        opacity: 0;
                        transition: all .3s ease;
                    }
                }
            }

            &.color-1+label span {
                background-color: $color-1;
            }

            &.color-2+label span {
                background-color: $color-2;
                opacity: 0.7;
            }

            &.custom-radios+label span {
                background-color: $color-3;
            }

            &.color-4+label span {
                background-color: $color-4;
            }

            &:checked+label span img {
                opacity: 1;
            }
        }
    }
</style>