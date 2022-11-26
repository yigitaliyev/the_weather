import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


function Chart({data}) {
 
    return (
        <Wrapper>
            <ResponsiveContainer width={800} height={300}>
              <LineChart width={1100} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line 
                 type="monotone"
                 dataKey="main.temp_max" 
                 stroke="#8884d8"
                />
                <Line 
                  type="monotone"
                  dataKey="main.temp_min" 
                  stroke="red"
                />
                <CartesianGrid 
                  stroke="#ccc"
                  strokeDasharray="5 5" 
                />
                <XAxis 
                  dataKey="dt_txt" 
                />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
        </Wrapper>
    )
}
export default Chart;

const Wrapper = styled.div`
 position :absolute ;
 top: 50%;
 z-index: 4;
    
  
  @media(max-width: 520px){
    position :absolute ;
    top: 90%;
    z-index: 4;
    
  }
`;