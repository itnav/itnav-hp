declare namespace astroHTML.JSX {
  type Tags = keyof DefinedIntrinsicElements;

  type Attributes<Tag extends Tags | null = null> = IntrinsicAttributes &
    (Tag extends null ? {} : DefinedIntrinsicElements[Tag]);
}
