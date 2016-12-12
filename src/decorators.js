export const hasAssets = target => {
	const {moduleId} = Reflect.getOwnMetadata('annotations', target)[0]
	Object.defineProperty(target.prototype, 'assetURL', {
		value(value) {
			return moduleId.replace(/[^\/]+$/, value)
		}
	})
}