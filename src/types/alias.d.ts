/**
 * PostgreSQL supports JSON functions and operators which gives flexibility when storing data inside a database column.
 * See: https://www.postgresql.org/docs/current/functions-json.html
 *
 * The recommended type is JSONB for almost all cases. When you use the JSONB
 * format, the data is parsed when it's put into the database so it's faster
 * when querying and also it can be indexed.
 */
type JSONB = Record<string, any>

type DateISOString = string

type Float4 = number

type UUID = string

type PrimaryKey<T = string> = T

type CalendarDate = `${string}-${string}-${string}` | string

type Timestamp = DateISOString

type Time = DateISOString

type Float8 = number

type Json = Record<string, any>

type Int8 = number
