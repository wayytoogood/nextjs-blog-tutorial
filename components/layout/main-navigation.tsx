import Link from 'next/link'
import Logo from './logo'

import classes from './main-navigation.module.css'

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      {/* Link'in içinde düz yazıdan başka bi şey varsa, a tag ekleyerek bunun bir link olduğunu belirtmemiz gerekiyor, Link'in href property'si çocuğu olan a'ya aktarılıyor. */}
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
