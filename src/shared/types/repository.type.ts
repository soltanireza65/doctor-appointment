export type Enumerable<T> = T[];

export type WhereUniqueInputBase = {
	id?: string;
};

export type CommonFilter<T> = {
	equals?: T;
	in?: Enumerable<T>;
	notIn?: Enumerable<T>;
	not?: CommonFilter<T> | T;
};

type Filter<T> = CommonFilter<T> & {
	lt?: T;
	lte?: T;
	gt?: T;
	gte?: T;
};

export type NumberFilter = number | Filter<number>;

export type StringFilter =
	| string
	| (Filter<string> & {
			contains?: string;
			startsWith?: string;
			endsWith?: string;
	  });

export type ListFilter<T> = {
	equals?: Enumerable<T>;
	has?: T | null;
	hasEvery?: Enumerable<T>;
	hasSome?: Enumerable<T>;
	isEmpty?: boolean;
};

export type DateTimeFilter = {
	equals?: Date | string;
	in?: Enumerable<Date> | Enumerable<string>;
	notIn?: Enumerable<Date> | Enumerable<string>;
	lt?: Date | string;
	lte?: Date | string;
	gt?: Date | string;
	gte?: Date | string;
};

export type TimeStamps = {
	createdAt?: DateTimeFilter | Date | string;
	updatedAt?: DateTimeFilter | Date | string | null;
	deletedAt?: DateTimeFilter | Date | string | null;
};

export type LogicalOperators<T> = {
	AND?: Enumerable<T | WhereInput<T>>;
	OR?: Enumerable<T | WhereInput<T>>;
	NOT?: Enumerable<T | WhereInput<T>> | T | WhereInput<T>;
};

export type BoolFilter = {
	equals?: boolean;
	not?: BoolFilter | boolean;
};

export type WhereInput<T> = LogicalOperators<T> & T & TimeStamps;

export class Pagination {
	take?: number;
	page?: number;
}

export class FindOption<TWhereUniqueInput> {
	where?: Partial<TWhereUniqueInput>;
}
export type OrderByInput<TWhereInput> = Partial<Record<keyof TWhereInput, 'desc' | 'asc'>>;
export class FindAndPaginateOption<TWhereInput> extends Pagination {
	where?: Partial<TWhereInput>;
	orderBy?: OrderByInput<TWhereInput>;
}
export class Paginated<T> {
	items!: T[];
	total!: number;
}
