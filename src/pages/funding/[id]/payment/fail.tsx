import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { code, message },
  } = context;

  return { props: { code, message } };
};

interface FailProps {
  code: string;
  message: string;
}

export default function Fail({ code, message }: FailProps) {
  return (
    <div className="result wrapper">
      <div className="box_section">
        <h2>결제 실패</h2>
        <p>{`에러 코드: ${code}`}</p>
        <p>{`실패 사유: ${message}`}</p>
      </div>
    </div>
  );
}
