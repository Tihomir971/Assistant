type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
type TimeStyle = Intl.DateTimeFormatOptions['timeStyle'];

export function formatDate(
	date: string,
	dateStyle: DateStyle = 'short',
	timeStyle: TimeStyle = 'short',
	locales = 'sr-Latn'
) {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle, timeStyle });

	return formatter.format(new Date(date));
}

export function formatNumber(number: number, locales = 'sr-Latn') {
	const formatter = new Intl.NumberFormat(locales, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	return formatter.format(number);
}
