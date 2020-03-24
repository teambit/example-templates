export default `<template>
	<CodeGenerator />
</template>

<script>
	import CodeGenerator from '@bit/bit.javascript.raw.code-generator';
	
	export default (
		{
			data () {
				return {
					var1: 'World'
				}
			},
			components: {
				CodeGenerator
			}
		}
	)
</script>

<style scoped>

</style>`;
