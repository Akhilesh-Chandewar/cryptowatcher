import ChevronDown from "../../assets/svg/chevronDown"
import Info from "../../assets/svg/info"

const styles = {
    textIcon: `flex items-center`
}

const CryptoTableHeader = () => {
  return( 
  <tbody>
  <tr>
      <th></th>
      <th className="flex items-center"><b># &nbsp;</b><ChevronDown /></th>
      <th><div className={styles.textIcon}>Name</div></th>
      <th><div className={styles.textIcon}>Price</div></th>
      <th><div className={styles.textIcon}><p className="mr-2">Market Cap</p> <Info /></div></th>
      <th><div className={styles.textIcon}><p className="mr-2">Circulating Supply</p> <Info /></div></th>
  </tr>
</tbody>
  )
}

export default CryptoTableHeader