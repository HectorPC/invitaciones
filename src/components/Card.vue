<template>
    <div id="card" class="card">
        <div class="card__side card__side--front card__side--front-1" :class="{'stop-rotate-front': isSelected}">
        
            <div class="card__description"><slot name="front"></slot></div>
        </div>
        <div class="card__side card__side--back card__side--back-1" :class="{'stop-rotate-back': isSelected}">
            <div class="card__description"><slot name="back"></slot></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        props: {
            isSelected: {default: false}
        }
    }
</script>

<style lang="scss" scoped>
    $color-primary-light: white;
    $color-primary-dark: white;
    $color-secondary-light: #FFB900;
    $color-secondary-dark: #FF7730;
    $color-tertiary-light: #2998FF;
    $color-tertiary-dark: #5643FA;

    .card {
        /* display: inline-block; */
        width: 100%;
        position: relative;
        height: 250px;
        perspective: 250px;

        &__side {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 250px;
            backface-visibility: hidden;
            transition: all .6s ease;
            box-shadow: 1em 1em 2em rgba(0, 0, 0, .2);

            &--front {
                background-color: #FFF;
            }

            &--back {
                color: #FFF;
                transform: rotateY(180deg);

                &-1 {
                    background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark);
                    ;
                }

                &-2 {
                    background-image: linear-gradient(to right bottom, $color-tertiary-light, $color-tertiary-dark);
                }

                &-3 {
                    background-image: linear-gradient(to right bottom, $color-secondary-light, $color-secondary-dark);
                }
            }
        }

        &:hover &__side--front {
            transform: rotateY(-180deg);
        }

        &:hover &__side--back {
            transform: rotate(0);
        }

        &__description {
            font-size: 5em;
            padding: 1em 0;
            text-align: center;
        }

        .stop-rotate-front {
            transform: rotateY(-180deg);
        }

        .stop-rotate-back {
            transform: rotate(0);
        }


        .card__side--back .card__description{
            padding: 0;
            height: 100%;
            width: 100%;
        }
        .card__side--back .card__description *{
            width: 100%;
            height: 100%;
        }
    }
</style>