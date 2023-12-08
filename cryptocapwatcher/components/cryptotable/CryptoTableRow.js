import { useRouter } from 'next/router';
import Star from '../../assets/svg/star'

const styles = {
    tableRow: `text-white border-b border-gray-800 text-[0.93rem] cursor-pointer transition-colors duration-300 hover:bg-gray-700`,
}

const CryptoTableRow = ({num, name, price, market_cap, circulating_supply}) => {
    const router = useRouter();
    const viewCoinDetails = () => {
        router.push(`/currencies/info?coin=${name}`);
    }
    return (
        <tbody className={styles.tableRow} onClick={() => viewCoinDetails()}>
            <tr>
                <td><Star/></td>
                <td>{num}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{market_cap}</td>
                <td>{circulating_supply}</td>
            </tr>
        </tbody>
    )
}

export default CryptoTableRow;
