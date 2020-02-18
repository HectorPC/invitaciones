<template>
	<div id="generateButton">
		<a href="#" class="myButton">
			<slot></slot>
		</a>
	</div>
</template>

<script>
	export default {
		name: 'ButtonGenerar'
	}
</script>

<style scoped>
	#generateButton {
		display: inline-block;
	}

	.myButton {
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0.05, #FCDA18), color-stop(1, #c1a91f));
		background: -moz-linear-gradient(top, #FCDA18 5%, #c1a91f 100%);
		background: -webkit-linear-gradient(top, #FCDA18 5%, #c1a91f 100%);
		background: -o-linear-gradient(top, #FCDA18 5%, #c1a91f 100%);
		background: -ms-linear-gradient(top, #FCDA18 5%, #c1a91f 100%);
		background: linear-gradient(to bottom, #FCDA18 5%, #c1a91f 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#FCDA18', endColorstr='#c1a91f', GradientType=0);
		background-color: #FCDA18;
		-moz-border-radius: 28px 5px 5px 28px;
		-webkit-border-radius: 28px 5px 5px 28px;
		border-radius: 28px 5px 5px 28px;
		border: 3px solid #c1a91f;
		display: inline-block;
		cursor: pointer;
		color: #ffffff;
		font-family: Arial;
		font-size: 18px;
		padding: 11px 16px;
		text-decoration: none;
		text-shadow: 1px 1px 0px #c1a91f;
		box-shadow: 5px 10px 8px 1px #888888;
	}

	.myButton:active {
		position: relative;
		top: 1px;
	}

	@media screen and (max-width: 768px) {
		.myButton {
			border-radius: 28px 28px 28px 28px;
		}
	}
</style>