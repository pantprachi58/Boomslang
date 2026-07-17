import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container/Container";
import { CalendarIcon } from "@/components/icons/Icons";
import { getAllBlogs } from "@/data/blogs";
import styles from "./BlogDetailContent.module.css";

export default function BlogDetailContent({ blog }) {
  const relatedPosts = getAllBlogs()
    .filter((post) => post.slug !== blog.slug && post.category === blog.category)
    .slice(0, 2);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <Link href="/blog" className={styles.backLink}>
            Back to Blog
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.category}>{blog.category}</span>
              <h1 className={styles.title}>{blog.title}</h1>
              <p className={styles.excerpt}>{blog.excerpt}</p>
              <div className={styles.meta}>
                <span>{blog.author}</span>
                <span className={styles.metaDivider} aria-hidden="true" />
                <span className={styles.metaItem}>
                  <CalendarIcon className={styles.metaIcon} />
                  {blog.displayDate}
                </span>
                <span className={styles.metaDivider} aria-hidden="true" />
                <span>{blog.readTime}</span>
              </div>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className={styles.heroImage}
                sizes="(max-width: 992px) 100vw, 45vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className={styles.contentLayout}>
          <article className={styles.article}>
            <p className={styles.lead}>{blog.description}</p>
            {blog.content.map((section) => (
              <section className={styles.articleSection} key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <div className={styles.tagList} aria-label="Article tags">
              {blog.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h2>Article Summary</h2>
              <dl className={styles.summaryList}>
                <div>
                  <dt>Category</dt>
                  <dd>{blog.category}</dd>
                </div>
                <div>
                  <dt>Author</dt>
                  <dd>{blog.author}</dd>
                </div>
                <div>
                  <dt>Read Time</dt>
                  <dd>{blog.readTime}</dd>
                </div>
              </dl>
            </div>

            {relatedPosts.length > 0 && (
              <div className={styles.sidebarCard}>
                <h2>Related Articles</h2>
                <div className={styles.relatedList}>
                  {relatedPosts.map((post) => (
                    <Link href={post.href} className={styles.relatedItem} key={post.id}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={86}
                        height={70}
                        className={styles.relatedImage}
                      />
                      <span>{post.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </main>
  );
}
