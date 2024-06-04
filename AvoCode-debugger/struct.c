#include<stdio.h>

typedef struct {
    int val;
}MyStruct;
int main()
{
    MyStruct st;
    st.val = 0;
    st.val = 1;
    st.val = 1000;

    return 0;
}