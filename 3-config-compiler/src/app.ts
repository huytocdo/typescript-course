console.log('Time to get started...');

function add(n1: number, n2: number): number {
  if(n1 + n2 > 0) {
    return n1 + n2;
  }
  return 0;
}


const minus: (n1: number, n2: number) => number = (n1, n2) => n1 - n2;