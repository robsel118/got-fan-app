export interface Book {
  readonly url: string
  readonly name: string
  readonly isbn: string
  readonly authors: string []
  readonly numberOfPages: number
  readonly country: string
  readonly released: Date
  readonly published: string
  readonly mediaType: string
  readonly characters: string[]
  readonly povCharacters: string[]
}
