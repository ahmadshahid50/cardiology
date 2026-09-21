interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/**
 * Renders a schema.org block.
 *
 * The payload is built from static, project-controlled data, and `<` is escaped
 * so the serialised JSON can never terminate the script element early.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
