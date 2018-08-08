import PageSupport from './PageSupport'

/**
 * Centralizing the creation of PageSupport because it is needed in both
 * {@link HostPage} and {@link client}.
 *
 * @ignore
 */
const newPageSupport = () => {
  const pageSupport = PageSupport.getInstance(true)
  pageSupport.setTitle('Paragons')
  pageSupport.setDescription('\"All the pices matter ...\"')
  pageSupport.addKeywords('react, ssr, redux, router, code splitting, sass',
    'i18n')
  return pageSupport
}

export default newPageSupport
