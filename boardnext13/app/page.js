import styles from './page.module.css'
import Link from 'next/link'
import Login from './Login';

const Home = () =>{
 
    return(
        <div className='main'>
            <div className={styles.login}>
                <Login />
                <div className={styles.bottomText}>
                        사용자가 아니면 ▶<Link href="/member/signup" style={{"cursor":"pointer"}}>여기</Link>를 눌러 등록을 해주세요.<br /><br />
                    [<Link href="/member/searchID">아이디</Link> | <Link href="/member/searchPassword" >패스워드</Link>  찾기]  <br /><br />    
                </div>
            </div> 
        </div>    
    );
};

export default Home;