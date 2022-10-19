export type Option<T> = {
	unwrap: (message?: string) => T
	match: <R>(matchers: OptionMatcher<T, R>) => R
}

type OptionMatcher<T, R> = {
	onSome: (value: T) => R
	onNone: () => R
}

type OptionValue<T> =
	| SomeValue<T>
	| NoneValue

type SomeValue<T> = {
	__isSome: true
	value: T
}

type NoneValue = {
	__isSome: false
}

const some = <T>(value: T) => toOption({
	__isSome: true,
	value,
})

const none = <T>() => toOption<T>({
	__isSome: false,
})

const toOption = <T>(value: OptionValue<T>): Option<T> =>
{
	const unwrap = (message?: string) =>
	{
		if (!message)
			console.warn('Either provide <option>.unwrap with a failure message or use <option>.match');

		if (value.__isSome)
			return value.value;

		throw message ?? 'Value was None; expected Some.';
	}

	const match = <R>(matchers: OptionMatcher<T, R>): R =>
		value.__isSome
			? matchers.onSome(value.value)
			: matchers.onNone();

	return ({
		unwrap,
		match,
	})
}

export const option = Object.freeze({
	some,
	none,
})
